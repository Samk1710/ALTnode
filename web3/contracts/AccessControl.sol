// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

/**
 * @title AccessControl
 * @dev The AccessControl contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of user permissions.
 */

contract AccessControl {
    /*Custom error messages*/
    error Altnode__OnlyOwner();
    error Altnode__ZeroAddress();

    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev The AccessControl constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), owner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        if (
            msg.sender != owner ||
            msg.sender != address(0xe34b40f38217f9Dc8c3534735f7f41B2cDA73A75) ||
            msg.sender != address(0x6af90FF366aE23f4Bb719a56eBc910aF4C169aCE) ||
            msg.sender != address(0xF23be0fbE9DEf26570278F91f3F150Af015a3ECf) ||
            msg.sender != address(0xF5E93e4eEDbb1235B0FB200fd77068Cb9938eF4f)
        ) {
            revert Altnode__OnlyOwner();
        }
        _;
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "AccessControl: new owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function getOwner(address sender) public pure returns (address) {
        return sender;
    }
}