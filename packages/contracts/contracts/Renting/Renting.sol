// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import "./IRenting.sol";

// interface IERC1155Rentable is IERC1155 {
//   /* The address of the base ERC1155 asset */
//   function baseAssetAddress() external view returns (address);

//   // Duration of a rental period
//   function epochDuration() external view returns (uint);

//   // Starting point of the first epoch
//   function epochStart() external view returns (uint);

//   struct Rental {
//     uint256 price;
//     uint256 startEpoch;
//     uint256 numEpochs;
//   }

//   /* Sets the rental `price` per period for a given `id` */
//   function setPrice(uint256 tokenId, uint256 price) external;

//   /* Get the rental price for a given id */
//   function priceOf(uint256 tokenId) external view returns (uint256);

//   /* Rent an asset with given `id` for a number of `periods` */
//   function rent(uint256 tokenId, uint periods) external;

//   /* End all uncomplete rentals early for a given `id`, returning the rent for unused periods */
//   function release(uint256 tokenId) external;

//   /* Collect any uncollected rent for an epoch */
//   function collect(uint256 tokenId, uint256 epochId) external;

//   /* Collect any outstanding rent up to current epoch */
//   function batchCollect(uint256 tokenId) external;

//   function rentalsOf(address account, uint256 tokenId) external view returns (Rental[] memory);
// }

// contract Renting is ERC165, IERC1155, IERC1155Rentable {
contract Renting is ERC165, IERC1155, IRenting {

  using Address for address;
  using SafeMath for uint256;

  /* The address of the base ERC1155 asset */
  address public override baseAssetAddress;

  // Duration of a rental period
  uint public override epochDuration;

  // Starting point of the first epoch
  uint public override epochStart;

  IERC721 private _baseAsset;
  IERC20 public feeAsset;

  // Mapping of tokenIds to prices
  mapping(uint256 => uint256) private _prices;

  // Mapping from tokenId to epochId
  mapping(uint256 => uint256) private lastEpochIdCollected;

  // Rental data mapping from tokenId to address to
  // XXX explore only storing a single Rental per user
  mapping(uint256 => mapping(address => Rental[])) _rentals;

  // Mapping of tokenId to epoch to collectable rent at epoch
  mapping(uint256 => mapping(uint256 => uint256)) _rentalSize;

  // Mapping from account to operator approvals
  mapping (address => mapping(address => bool)) private _operatorApprovals;

  constructor(
    address _baseAssetAddress,
    address _feeAsset,
    uint _epoch1Start,
    uint _epochDuration
  ) {
    baseAssetAddress = _baseAssetAddress;
    _baseAsset = IERC721(_baseAssetAddress);
    feeAsset = IERC20(_feeAsset);
    epochDuration = _epochDuration;
    epochStart = _epoch1Start;

    require(baseAssetAddress.isContract(), "Asset must be a contract address");
    require(_feeAsset.isContract(), "Asset must be a contract address");

    // TODO check baseAsset and feeAsset implement correct interfaces
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return interfaceId == type(IERC1155).interfaceId
      // || interfaceId == type(IERC1155MetadataURI).interfaceId
      || super.supportsInterface(interfaceId);
  }

  function setPrice(uint256 tokenId, uint256 price) public override {
    require(_baseAsset.ownerOf(tokenId) == msg.sender, "You must be the owner to set the price");

    _prices[tokenId] = price;
  }

  function priceOf(uint256 tokenId) public view override returns (uint256) {
    return _prices[tokenId];
  }

  function rent(uint256 tokenId, uint numEpochs) public override {

    uint256 rentalPrice = priceOf(tokenId);
    // A price must be set for the token to be rentable
    require(rentalPrice > 0, "Token is not rentable");

    // Check and collect rental funds
    uint256 totalPrice = rentalPrice.mul(numEpochs);
    require(feeAsset.allowance(msg.sender, address(this)) >= totalPrice, "Token allowance too small");

    feeAsset.transferFrom(msg.sender, address(this), totalPrice);

    // Update rental state
    Rental[] storage rentals = _rentals[tokenId][msg.sender];
    uint256 currentEpoch = _getEpochId();

    rentals.push(Rental({
      price: rentalPrice,
      startEpoch: currentEpoch,
      numEpochs: numEpochs
    }));

    // Update collectable rent amount for tokenId
    for (uint e = currentEpoch; e < currentEpoch.add(numEpochs); e++) {
      _rentalSize[tokenId][e] = _rentalSize[tokenId][e].add(rentalPrice);
    }

    // XXX clean up old rentals?

    // TODO emit event
  }

  function release(uint256 tokenId) public override {

    // TODO check ownership
    uint256 currentEpoch = _getEpochId();
    Rental[] storage rentals = _rentals[tokenId][msg.sender];

    uint256 amount;

    for (uint i = 0; i < rentals.length; i++) {
      Rental storage rental = rentals[i];
      uint256 endEpoch = rental.startEpoch.add(rental.numEpochs);
      if (endEpoch > currentEpoch) {
        uint remainingEpochs = endEpoch.sub(currentEpoch);

        // Update return amount
        amount.add(remainingEpochs.mul(rental.price));

        // Reduce rental sizes for remaing rentals
        for (uint e = currentEpoch; e < currentEpoch.add(remainingEpochs); e++) {
          _rentalSize[tokenId][e] = _rentalSize[tokenId][e].sub(rental.price);
        }

        // XXX possible wraparound, rental migh not have started, if so, set to 0
        rental.numEpochs = currentEpoch.sub(rental.startEpoch);
      }
    }

    // Return remaining rent
    feeAsset.transfer(msg.sender, amount);
  }

  function collect(uint256 tokenId, uint256 epochId) public override {
    address owner = _baseAsset.ownerOf(tokenId);
    uint256 currentEpoch = _getEpochId();
    uint256 lastEpoch = lastEpochIdCollected[tokenId];

    require(currentEpoch >= epochId, "Cannot collect future rent");
    require(currentEpoch > lastEpoch, "All rent already collected");

    uint256 amount = _rentalSize[tokenId][epochId];

    // Mark rent as collected
    lastEpochIdCollected[tokenId] = currentEpoch;

    // Transfer rent to owner
    feeAsset.transfer(owner, amount);

    // TODO emit event
  }

  function batchCollect(uint256 tokenId) public override {
    address owner = _baseAsset.ownerOf(tokenId);
    uint256 currentEpoch = _getEpochId();
    uint256 lastEpoch = lastEpochIdCollected[tokenId];

    require(currentEpoch > lastEpoch, "All rent already collected");

    uint256 collectableRent = 0;

    // XXX if rent has never been collected this could be a while
    for(uint256 e = lastEpoch; e <= currentEpoch; e++) {
      collectableRent.add(_rentalSize[tokenId][e]);
    }

    // Mark rent as collected
    lastEpochIdCollected[tokenId] = currentEpoch;

    // Transfer rent to owner
    feeAsset.transfer(owner, collectableRent);
  }

  // Get the rental information for a
  function rentalsOf(address account, uint256 tokenId) public view override returns (Rental[] memory) {
    return _rentals[tokenId][account];
  }

  // function rentAt() {

  // }


  function _getEpochId() internal view returns (uint256) {
    if (block.timestamp < epochStart) return 0;

    return block.timestamp.sub(epochStart).div(epochDuration).add(1);
  }


  /***** ERC1155 Functions *******/


  // function uri(uint256) public view virtual override returns (string memory) {

  // }

  function balanceOf(address account, uint256 id) public view override returns (uint256) {
    Rental[] memory rentals = _rentals[id][account];

    uint256 balance = 0;

    uint256 currentEpoch = _getEpochId();

    for (uint256 i = 0; i < rentals.length; i++) {
      if (rentals[i].startEpoch > currentEpoch && rentals[i].startEpoch + rentals[i].numEpochs < currentEpoch) {
        balance++;
      }
    }

    return balance;
  }

  function balanceOfBatch(
    address[] memory accounts,
    uint256[] memory ids
  ) public view virtual override returns (uint256[] memory) {
    require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");

    uint256[] memory batchBalances = new uint256[](accounts.length);

    for (uint256 i = 0; i < accounts.length; ++i) {
      batchBalances[i] = balanceOf(accounts[i], ids[i]);
    }

    return batchBalances;
  }

  function setApprovalForAll(address operator, bool approved) public virtual override {
    _operatorApprovals[msg.sender][operator] = approved;
    emit ApprovalForAll(msg.sender, operator, approved);
  }

  function isApprovedForAll(address account, address operator) public view virtual override returns (bool) {
    return _operatorApprovals[account][operator];
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  )
    public
    virtual
    override
  {

    require(to != address(0), "ERC1155: transfer to the zero address");
    require(
      from == msg.sender || isApprovedForAll(from, msg.sender),
      "ERC1155: caller is not owner nor approved"
    );

    address operator = msg.sender;

    _beforeTokenTransfer(operator, from, to, _asSingletonArray(id), _asSingletonArray(amount), data);

    _transferFrom(from, to, id, amount);

    emit TransferSingle(operator, from, to, id, amount);

    _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
  }

  function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  )
    public
    virtual
    override
  {

    require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
    require(to != address(0), "ERC1155: transfer to the zero address");
    require(
        from == msg.sender || isApprovedForAll(from, msg.sender),
        "ERC1155: transfer caller is not owner nor approved"
    );

    address operator = msg.sender;

    _beforeTokenTransfer(operator, from, to, ids, amounts, data);

    for (uint256 i = 0; i < ids.length; ++i) {
      uint256 id = ids[i];
      uint256 amount = amounts[i];

      _transferFrom(from, to, id, amount);
    }

    emit TransferBatch(operator, from, to, ids, amounts);

    _doSafeBatchTransferAcceptanceCheck(operator, from, to, ids, amounts, data);
  }

  function _transferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount
  ) internal {
    uint256 currentEpoch = _getEpochId();

    Rental[] storage fromRentals = _rentals[id][from];
    Rental[] storage toRentals = _rentals[id][to];

    // Get rentals to transfer
    Rental[] memory transferredRentals = new Rental[](amount);

    for (uint256 i = 0; i < fromRentals.length && i < amount; i++) {
      Rental memory rental = fromRentals[i];
      if (rental.startEpoch.add(rental.numEpochs) > currentEpoch) {
        transferredRentals[i] = rental;
      }
    }

    require(transferredRentals[amount - 1].numEpochs == 0, "insufficient balance for transfer");

    // XXX remove transferred rentals from
    for (uint256 i = 0; i < fromRentals.length; i++) {
      Rental memory rental = fromRentals[i];
      if (rental.startEpoch.add(rental.numEpochs) > currentEpoch) {
        delete fromRentals[i];
      }
    }

    // Add rentals to recipient
    for (uint256 i = 0; i < amount; i++) {
      toRentals.push(transferredRentals[i]);
    }
  }

    /**
   * @dev Hook that is called before any token transfer. This includes minting
   * and burning, as well as batched variants.
   *
   * The same hook is called on both single and batched variants. For single
   * transfers, the length of the `id` and `amount` arrays will be 1.
   *
   * Calling conditions (for each `id` and `amount` pair):
   *
   * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
   * of token type `id` will be  transferred to `to`.
   * - When `from` is zero, `amount` tokens of token type `id` will be minted
   * for `to`.
   * - when `to` is zero, `amount` of ``from``'s tokens of token type `id`
   * will be burned.
   * - `from` and `to` are never both zero.
   * - `ids` and `amounts` have the same, non-zero length.
   *
   * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
   */
  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  )
    internal
    virtual
  { }

  function _doSafeTransferAcceptanceCheck(
      address operator,
      address from,
      address to,
      uint256 id,
      uint256 amount,
      bytes memory data
  )
      private
  {
      if (to.isContract()) {
          try IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data) returns (bytes4 response) {
              if (response != IERC1155Receiver(to).onERC1155Received.selector) {
                  revert("ERC1155: ERC1155Receiver rejected tokens");
              }
          } catch Error(string memory reason) {
              revert(reason);
          } catch {
              revert("ERC1155: transfer to non ERC1155Receiver implementer");
          }
      }
  }

  function _doSafeBatchTransferAcceptanceCheck(
      address operator,
      address from,
      address to,
      uint256[] memory ids,
      uint256[] memory amounts,
      bytes memory data
  )
      private
  {
      if (to.isContract()) {
          try IERC1155Receiver(to).onERC1155BatchReceived(operator, from, ids, amounts, data) returns (bytes4 response) {
              if (response != IERC1155Receiver(to).onERC1155BatchReceived.selector) {
                  revert("ERC1155: ERC1155Receiver rejected tokens");
              }
          } catch Error(string memory reason) {
              revert(reason);
          } catch {
              revert("ERC1155: transfer to non ERC1155Receiver implementer");
          }
      }
  }

  function _asSingletonArray(uint256 element) private pure returns (uint256[] memory) {
    uint256[] memory array = new uint256[](1);
    array[0] = element;

    return array;
  }
}