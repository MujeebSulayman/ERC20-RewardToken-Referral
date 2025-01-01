// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HemReward is ERC20, Ownable {
    mapping (address => address) referrals;
    mapping (address => uint256) referralRewards;

    uint256 public maxSupply;
    uint256 public totalMinted;

    

}
    
