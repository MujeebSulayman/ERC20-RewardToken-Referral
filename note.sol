// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Simplified Reward Token contract without Pausable
contract RewardToken is ERC20, Ownable {
    // Referral system: Track referrals
    mapping(address => address) public referrals;
    mapping(address => uint256) public referralRewards;

    // Minting limit
    uint256 public maxSupply;
    uint256 public totalMinted;

    // Events
    event ReferralRewardClaimed(address indexed referrer, uint256 reward);
    event RewardDistributed(address indexed user, uint256 amount);

    // Constructor: Set initial supply and max supply
    constructor(uint256 _initialSupply, uint256 _maxSupply) ERC20("RewardToken", "RWT") {
        _mint(msg.sender, _initialSupply * (10 ** decimals())); // Mint initial supply to owner
        maxSupply = _maxSupply * (10 ** decimals());
        totalMinted = _initialSupply * (10 ** decimals());
    }

    // Mint new tokens (ensure total supply doesn't exceed max supply)
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalMinted + amount <= maxSupply, "Max supply exceeded");
        _mint(to, amount);
        totalMinted += amount;
    }

    // Burn tokens from the sender's balance
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        totalMinted -= amount;
    }

    // Distribute rewards to users
    function distributeReward(address recipient, uint256 amount) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        _mint(recipient, amount);
        emit RewardDistributed(recipient, amount);
    }

    // Set referrer for a user
    function setReferral(address referrer) external {
        require(referrals[msg.sender] == address(0), "Already referred");
        referrals[msg.sender] = referrer;
    }

    // Claim referral reward
    function claimReferralReward(address referredUser) external {
        address referrer = referrals[referredUser];
        require(referrer != address(0), "No referrer");

        uint256 reward = 100 * (10 ** decimals()); // Example reward of 100 tokens
        _mint(referrer, reward);
        referralRewards[referrer] += reward;

        emit ReferralRewardClaimed(referrer, reward);
    }
}
