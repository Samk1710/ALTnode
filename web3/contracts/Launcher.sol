// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FixedPriceBondingCurveToken is ERC20 {
    address public owner;
    uint256 public reserve;
    uint256 public fixedPrice = 0.01 ether;
    uint256 public saleDuration = 7 days;
    uint256 public saleEndTime;
    bool public saleActive = true;

    // Bonding curve variables
    uint256 public a = 1e15; 
    uint256 public b = 1e16; 

    // Token metadata
    string public loreUrl;
    uint256 public initialSupply;
    uint256 public ownerAllocation;
    uint256 public airdropAllocation;

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 price);
    event TokensSold(address indexed seller, uint256 amount, uint256 refund);
    event AirdropExecuted(uint256 totalTokens, uint256 recipientCount);

    constructor(
        string memory _name, 
        string memory _symbol, 
        uint256 _initialSupply, 
        string memory _loreUrl, 
        address[] memory airdropRecipients, 
        uint256 airdropPercentage
    ) ERC20(_name, _symbol) {
        owner = msg.sender;
        saleEndTime = block.timestamp + saleDuration;
        loreUrl = _loreUrl;
        initialSupply = _initialSupply * 10**decimals();
        ownerAllocation = (initialSupply * 20) / 100;

        require(airdropPercentage > 0 && airdropPercentage <= 100, "Invalid airdrop percentage");

        _mint(address(this), initialSupply);
        _mint(owner, ownerAllocation);

        // Distribute airdrop
        airdropAllocation = (ownerAllocation * airdropPercentage) / 100;
        require(airdropRecipients.length > 0, "No airdrop recipients");
        require(airdropAllocation > 0, "Airdrop amount too low");

        uint256 tokensPerRecipient = airdropAllocation / airdropRecipients.length;
        require(tokensPerRecipient > 0, "Too many recipients, amount too low");

        for (uint256 i = 0; i < airdropRecipients.length; i++) {
            _transfer(owner, airdropRecipients[i], tokensPerRecipient);
        }

        emit AirdropExecuted(airdropAllocation, airdropRecipients.length);
    }

    function getPrice(uint256 amount) public view returns (uint256) {
        if (saleActive) {
            return fixedPrice * amount;
        } else {
            uint256 supply = totalSupply();
            uint256 totalPrice = 0;
            for (uint256 i = 0; i < amount; i++) {
                totalPrice += a * (supply + i) + b;
            }
            return totalPrice;
        }
    }

    function buyTokens(uint256 amount) public payable {
        if (block.timestamp >= saleEndTime) {
            saleActive = false;
        }

        uint256 cost = getPrice(amount);
        require(msg.value >= cost, "Not enough ETH sent");

        _transfer(address(this), msg.sender, amount);
        reserve += msg.value;

        emit TokensPurchased(msg.sender, amount, cost);
    }

    function sellTokens(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Not enough tokens");
        require(!saleActive, "Cannot sell during fixed price sale");

        uint256 refund = getPrice(amount) / 2;
        _transfer(msg.sender, address(this), amount);
        reserve -= refund;

        payable(msg.sender).transfer(refund);
        emit TokensSold(msg.sender, amount, refund);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
}
