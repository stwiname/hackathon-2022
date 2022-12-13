// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

interface IRenting is IERC1155 {
  /* The address of the base ERC1155 asset */
  function baseAssetAddress() external view returns (address);

  // Duration of a rental period
  function epochDuration() external view returns (uint);

  // Starting point of the first epoch
  function epochStart() external view returns (uint);

  struct Rental {
    uint256 price;
    uint256 startEpoch;
    uint256 numEpochs;
  }

  /* Sets the rental `price` per period for a given `id` */
  function setPrice(uint256 tokenId, uint256 price) external;

  /* Get the rental price for a given id */
  function priceOf(uint256 tokenId) external view returns (uint256);

  /* Rent an asset with given `id` for a number of `periods` */
  function rent(uint256 tokenId, uint periods) external;

  /* End all uncomplete rentals early for a given `id`, returning the rent for unused periods */
  function release(uint256 tokenId) external;

  /* Collect any uncollected rent for an epoch */
  function collect(uint256 tokenId, uint256 epochId) external;

  /* Collect any outstanding rent up to current epoch */
  function batchCollect(uint256 tokenId) external;

  function rentalsOf(address account, uint256 tokenId) external view returns (Rental[] memory);
}