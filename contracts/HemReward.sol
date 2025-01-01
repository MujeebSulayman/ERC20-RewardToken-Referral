// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HemReward is ERC20, Ownable {
    mapping(address => address) referrals;
    mapping(address => uint256) referralRewards;

    uint256 public maxSupply;
    uint256 public totalMinted;

    event referralRewardsClaimed(address indexed referrer, uint256 reward);
    event rewardDistributed(address indexed user, uint256 amount);

    constructor(
        uint256 _initialSupply,
        uint256 _maxSupply
    ) ERC20("HemReward", "HMR") Ownable(msg.sender) {
        _mint(msg.sender, _initialSupply * (10 ** decimals()));
        maxSupply = _maxSupply * (10 ** decimals());
        totalMinted = _initialSupply * (10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalMinted + amount <= maxSupply, "MaxSupply exceeded");
        _mint(to, amount);
        totalMinted += amount;
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        totalMinted -= amount;
    }

    function distributeReward(address user, uint256 amount) public onlyOwner {
        require(user != address(0), "Invalid address");
        _mint(user, amount);
        emit rewardDistributed(user, amount);
    }

    function setReferral(address referrer) public {
        require(referrals[msg.sender] == address(0), "Invalid address");
        referrals[msg.sender] = referrer;
    }

    function claimReferralReward(address referredUser) public {
        address referrer = referrals[referredUser];
        require(referrer != address(0), "No referrer found");

        uint256 reward = 50 * (10 ** decimals());
        _mint(referrer, reward);
        referralRewards[referrer] += reward;

        emit referralRewardsClaimed(referrer, reward);
    }
}
