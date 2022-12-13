// Copyright (C) 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RentToken is ERC20, Ownable {
    using SafeERC20 for IERC20;

    constructor() ERC20('RentToken', 'PST') Ownable() {
        _mint(msg.sender, 10**28); // Initial Supply: 10,000,000,000 (10 billion)
    }
}
