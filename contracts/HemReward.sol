// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HemReward is ERC20, Ownable {
    mapping(address => address) public referrals;
    mapping(address => uint256) public referralRewards;
    mapping(address => uint256) public claimedRewards;

    uint256 public maxSupply;
    uint256 public totalMinted;
    uint256 public totalClaimed;

    event referralRewardsClaimed(address indexed referrer, uint256 reward);
    event rewardDistributed(address indexed user, uint256 amount);
    event rewardsClaimed(address indexed user, uint256 amount);

    constructor(
        uint256 _initialSupply,
        uint256 _maxSupply
    ) ERC20("HemReward", "HMR") Ownable(msg.sender) {
        _mint(msg.sender, _initialSupply * (10 ** decimals()));
        maxSupply = _maxSupply * (10 ** decimals());
        totalMinted = _initialSupply * (10 ** decimals());
        totalClaimed = 0;
    }

    function mint(uint256 amount) external {
        require(totalMinted + amount <= maxSupply, "MaxSupply exceeded");
        _mint(msg.sender, amount);
        totalMinted += amount;
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        totalMinted -= amount;
    }

    function distributeReward(address user, uint256 amount) public onlyOwner {
        require(user != address(0), "Invalid address");
        require(totalMinted + amount <= maxSupply, "MaxSupply exceeded");
        _mint(user, amount);
        totalMinted += amount;
        totalClaimed += amount;
        claimedRewards[user] += amount;
        emit rewardDistributed(user, amount);
    }

    function setReferral(address referrer) public {
        require(referrals[msg.sender] == address(0), "Invalid address");
        referrals[msg.sender] = referrer;
    }

    function claimReferralReward(address referredUser) public {
        address referrer = referrals[referredUser];
        require(referrer != address(0), "No referrer found");
        require(referralRewards[referrer] > 0, "No rewards to claim");

        uint256 reward = referralRewards[referrer];
        referralRewards[referrer] = 0;
        _mint(referrer, reward);
        totalMinted += reward;
        totalClaimed += reward;
        claimedRewards[referrer] += reward;
        emit referralRewardsClaimed(referrer, reward);
    }

    function claimTokens(uint256 amount) public {
        require(amount > 0, "Claim amount must be greater than 0");
        require(
            claimedRewards[msg.sender] >= amount,
            "Insufficient claimable tokens"
        );
        claimedRewards[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);
        totalClaimed += amount;
        emit rewardsClaimed(msg.sender, amount);
    }

    function getClaimedRewards(address user) public view returns (uint256) {
        return claimedRewards[user];
    }

    function getTotalClaimed() public view returns (uint256) {
        return totalClaimed;
    }

    function getMaxSupply() public view returns (uint256) {
        return maxSupply;
    }

    function getTotalMinted() public view returns (uint256) {
        return totalMinted;
    }
}
