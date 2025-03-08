// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
// import {AltTokens} from "./AltTokens.sol";

/**
 * @title Altnode
 * @author Altnode devs
 * @dev Altnode is a contract for managing the Altnode NFTs.
 */

contract Altnode is ERC721URIStorage {
    /* Custom Errors */
    error Altnode__InvalidAssetId(uint256 assetId);
    error Altnode__SubscriptionExists();
    error Altnode__InsufficientPayment();
    error Altnode__InvalidAccessKey();
    error Altnode__InvalidSubscription();
    error Altnode__OwnerCanNotPurchase();
    error Altnode__OnlyOwner();

    using Strings for uint256;

    uint256 private tokenId;
    address public owner;

    struct Subscription {
        uint256 validity; // Timestamp of subscription expiry
        bytes32 accessKey; // Unique access key
    }

    // Mapping from token ID to subscriber address to subscription details
    mapping(uint256 => mapping(address => Subscription)) public subscriptions;

    // Mapping from token ID to subscription price
    mapping(uint256 => uint256) public subscriptionPrices;

    // Mapping from access key to token ID
    mapping(bytes32 => uint256) private accessKeyToTokenId;

    // Private mapping from token ID to asset URI
    mapping(uint256 => string) private tokenIdToAssetURI;

    // Add new mapping to track subscribers for each asset
    mapping(uint256 => address[]) private assetSubscribers;
    // Add mapping to track if an address is already a subscriber to prevent duplicates
    mapping(uint256 => mapping(address => bool)) private isSubscriber;

    /* Events */
    event TokenMinted(
        address indexed to,
        uint256 tokenId,
        string tokenMetadata,
        uint256 price
    );

    event SubscriptionPurchased(
        address indexed subscriber,
        uint256 tokenId,
        uint256 validity,
        bytes32 accessKey,
        uint256 price
    );

    constructor() ERC721("Altnode", "AiT") {
        tokenId = 0;
        owner = msg.sender;
    }

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
     * @dev Mint a new asset token with a subscription price
     * @param to The address that will receive the minted tokens
     * @param tokenMetadata The metadata URI of the token
     * @param price The subscription price in wei
     */
    function mintAsset(
        address to,
        string calldata tokenMetadata,
        string calldata assetURI,
        uint256 price
    ) external {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenMetadata);
        tokenIdToAssetURI[tokenId] = assetURI;
        subscriptionPrices[tokenId] = price;

        emit TokenMinted(to, tokenId, tokenMetadata, price);

        tokenId++;
    }

    /**
     * @dev Get the token URI
     * @param assetId The ID of the asset
     * @return tokenURI The URI of the token
     */
    function tokenURI(
        uint256 assetId
    ) public view override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(assetId);
    }

    /**
     * @dev Purchase a subscription for an asset
     * @param assetId The ID of the asset
     * @param duration The duration of the subscription
     */
    function purchaseSubscription(
        uint256 assetId,
        uint256 duration
    ) external payable {
        if (assetId > tokenId) {
            revert Altnode__InvalidAssetId(assetId);
        }

        address assetOwner = ownerOf(assetId);

        if (msg.sender == assetOwner) {
            revert Altnode__OwnerCanNotPurchase();
        }

        if (subscriptions[assetId][msg.sender].validity >= block.timestamp) {
            revert Altnode__SubscriptionExists();
        }

        uint256 price = subscriptionPrices[assetId];
        if (msg.value < price) {
            revert Altnode__InsufficientPayment();
        }

        // Transfer the payment to the asset owner
        (bool success, ) = payable(assetOwner).call{value: msg.value}("");
        require(success, "Transfer failed.");

        // Generate a unique access key for the subscription
        bytes32 accessKey = keccak256(
            abi.encodePacked(
                msg.sender,
                "-",
                assetId.toString(),
                "-",
                block.timestamp.toString()
            )
        );

        subscriptions[assetId][msg.sender] = Subscription({
            validity: block.timestamp + duration,
            accessKey: accessKey
        });

        // Add subscriber to tracking if not already present
        if (!isSubscriber[assetId][msg.sender]) {
            assetSubscribers[assetId].push(msg.sender);
            isSubscriber[assetId][msg.sender] = true;
        }

        // Map the access key to the token ID
        accessKeyToTokenId[accessKey] = assetId;

        emit SubscriptionPurchased(
            msg.sender,
            assetId,
            block.timestamp + duration,
            accessKey,
            price
        );
    }

    /**
     * @dev Check if a subscription is valid
     * @param assetId The ID of the asset
     * @param subscriber The address of the subscriber
     * @return bool
     */
    function isSubscriptionValid(
        uint256 assetId,
        address subscriber
    ) public view returns (bool) {
        Subscription memory subscription = subscriptions[assetId][subscriber];
        return subscription.validity >= block.timestamp;
    }

    /**
     * @dev Get all active subscribers for a specific asset
     * @param assetId The ID of the asset
     * @return activeSubscribers Array of addresses with active subscriptions
     */
    function getActiveSubscribers(
        uint256 assetId
    ) external view returns (address[] memory) {
        if (assetId > tokenId) {
            revert Altnode__InvalidAssetId(assetId);
        }

        // Get total number of subscribers for this asset
        uint256 totalSubscribers = assetSubscribers[assetId].length;
        
        // Count active subscribers first
        uint256 activeCount = 0;
        for (uint256 i = 0; i < totalSubscribers; i++) {
            address subscriber = assetSubscribers[assetId][i];
            if (subscriptions[assetId][subscriber].validity >= block.timestamp) {
                activeCount++;
            }
        }

        // Create array for active subscribers
        address[] memory activeSubscribers = new address[](activeCount);
        
        // Fill array with active subscribers
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < totalSubscribers && currentIndex < activeCount; i++) {
            address subscriber = assetSubscribers[assetId][i];
            if (subscriptions[assetId][subscriber].validity >= block.timestamp) {
                activeSubscribers[currentIndex] = subscriber;
                currentIndex++;
            }
        }

        return activeSubscribers;
    }

    /* Getter Functions */

    /**
     * @dev Get all assets
     * @return json The JSON string of all assets
     */
    function getAllAssets() external view returns (string memory) {
        uint256 totalAssets = tokenId; // Total number of minted tokens
        string memory json = "[";

        for (uint256 i = 0; i < totalAssets; i++) {
            string memory asset = string(
                abi.encodePacked(
                    '{"tokenId": ',
                    Strings.toString(i),
                    ', "tokenUri": "',
                    tokenURI(i),
                    '"}'
                )
            );
            json = string(
                abi.encodePacked(json, asset, i < totalAssets - 1 ? "," : "")
            );
        }

        json = string(abi.encodePacked(json, "]"));
        return json;
    }

    /**
     * @dev Get all subscriptions for a subscriber
     * @param subscriber The address of the subscriber
     * @return json The JSON string of all active subscriptions
     */
    function getSubscriptions(
        address subscriber
    ) external view returns (string memory) {
        uint256 subscriptionCount = 0;
        uint256 copyofTokenId = tokenId;
        uint256[] memory subscribedTokenId = new uint256[](copyofTokenId);
        uint256 activeCount = 0;

        // First, count the number of active subscriptions for the subscriber
        for (uint256 i = 0; i < copyofTokenId; i++) {
            if (subscriptions[i][subscriber].validity > block.timestamp) {
                subscribedTokenId[activeCount] = i;
                activeCount++;
                subscriptionCount++;
            }
        }

        // Build the JSON string
        string memory json = "[";
        activeCount = 0;
        // Populate the JSON with active subscriptions
        for (uint256 i = 0; i < subscriptionCount; i++) {
            uint256 tkId = subscribedTokenId[i];
            if (subscriptions[tkId][subscriber].validity > block.timestamp) {
                if (activeCount > 0) {
                    json = string(abi.encodePacked(json, ","));
                }

                string memory subscriptionJson = string(
                    abi.encodePacked(
                        "{",
                        '"tokenId":',
                        Strings.toString(tkId),
                        ",",
                        '"tokenUri":"',
                        tokenURI(tkId),
                        '",',
                        '"accessKey":"',
                        Strings.toHexString(
                            uint256(subscriptions[tkId][subscriber].accessKey)
                        ),
                        '",',
                        '"validity":',
                        Strings.toString(subscriptions[tkId][subscriber].validity),
                        "}"
                    )
                );

                json = string(abi.encodePacked(json, subscriptionJson));
                activeCount++;
            }
        }

        json = string(abi.encodePacked(json, "]"));
        return json;
    }

    /**
     * @dev Get the token URI using an access key
     * @param accessKey The access key
     * @return tokenURI The URI of the token associated with the access key
     */
    function getTokenURIByAccessKey(
        bytes32 accessKey,
        address subscriber
    ) external view returns (string memory) {
        uint256 assetId = accessKeyToTokenId[accessKey];

        if (assetId < 0 || assetId > tokenId || ownerOf(assetId) == address(0)) {
            revert Altnode__InvalidAccessKey();
        }

        if (isSubscriptionValid(assetId, subscriber)) {
            return tokenURI(assetId);
        }

        revert Altnode__InvalidSubscription();
    }

    /**
     * @dev Get the hidden asset URI for valid subscribers
     * @param accessKey The access key
     * @param subscriber The address of the subscriber
     * @return assetURI The hidden URI of the asset
     */
    function getAssetURIByAccessKey(
        bytes32 accessKey,
        address subscriber
    ) external view returns (string memory) {
        uint256 assetId = accessKeyToTokenId[accessKey];

        if (assetId < 0 || assetId > tokenId || ownerOf(assetId) == address(0)) {
            revert Altnode__InvalidAccessKey();
        }

        if (isSubscriptionValid(assetId, subscriber)) {
            return tokenIdToAssetURI[assetId];
        }

        revert Altnode__InvalidSubscription();
    }

    /**
     * @dev Get the access key using a token ID and subscriber address
     * @param assetId The ID of the asset
     * @param subscriber The address of the subscriber
     * @return accessKey The access key
     */
    function getAccessKeyByTokenId(
        uint256 assetId,
        address subscriber
    ) external view returns (bytes32) {
        return subscriptions[assetId][subscriber].accessKey;
    }
}
