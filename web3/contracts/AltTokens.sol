// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Altnode
 * @author Altnode devs
 * @dev Altnode is a contract for managing the Altnode NFTs.
 */

contract AltTokens is ERC20 {
    using Strings for uint256;

    uint256 private tokenId;
    address public owner;

    // Public mapping of owner address to list of erc20 token contracts
    mapping(address => address[]) public ownerToErc20Tokens;

    address[] public erc20Tokens;

    /* Events */
    event TokensPurchased(
        address indexed buyer,
        uint256 ethAmount,
        uint256 tokenAmount
    );

    event TokensBurned(address indexed burner, uint256 tokenAmount);

    constructor() ERC20("Altnode", "AiT") {
        tokenId = 0;
        owner = msg.sender;
    }

    function buyAiT() external payable {
        uint256 exchangeRate = 1000000;
        require(msg.value > 0, "Must send ETH to purchase AiT.");
        uint256 tokenAmount = msg.value * exchangeRate;
        _mint(msg.sender, tokenAmount);
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    function burnAiT(uint256 amt) external {
        require(balanceOf(msg.sender) >= amt, "Insufficient AiT balance.");
        _burn(msg.sender, amt);
        emit TokensBurned(msg.sender, amt);
    }

    function setContract(address erc20Token) external {
        ownerToErc20Tokens[msg.sender].push(erc20Token);
        erc20Tokens.push(erc20Token);
    }

    function getContracts(address ownerAddress)
        external
        view
        returns (address[] memory)
    {
        return ownerToErc20Tokens[ownerAddress];
    }
}
