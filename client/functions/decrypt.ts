"use server";

import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { decryptToString } from "@lit-protocol/encryption";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { ethers } from "ethers";
import { LIT_ABILITY } from "@lit-protocol/constants";
import {
    LitAccessControlConditionResource,
    createSiweMessageWithRecaps,
    generateAuthSig,
} from "@lit-protocol/auth-helpers";
import { accessControlConditions } from "../constants/accesControlConditions";

const chain = "baseSepolia";

async function getSessionSignatures() {
    const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
    // const RPC = process.env.RPC;
    // Connect to the wallet
    // const provider = new ethers.JsonRpcProvider(RPC);
    const ethWallet = new ethers.Wallet(PRIVATE_KEY);
    const client = new LitJsSdk.LitNodeClient({
        alertWhenUnauthorized: false,
        debug: false,
        litNetwork: LIT_NETWORK.DatilDev,
    });
    await client.connect();

    // Get the latest blockhash
    const latestBlockhash = await client.getLatestBlockhash();

    // Define the authNeededCallback function
    const authNeededCallback = async (params: any) => {
        if (!params.uri) {
            throw new Error("uri is required");
        }
        if (!params.expiration) {
            throw new Error("expiration is required");
        }

        if (!params.resourceAbilityRequests) {
            throw new Error("resourceAbilityRequests is required");
        }

        // Create the SIWE message
        const toSign = await createSiweMessageWithRecaps({
            uri: params.uri,
            expiration: params.expiration,
            resources: params.resourceAbilityRequests,
            walletAddress: ethWallet.address,
            nonce: latestBlockhash,
            litNodeClient: client,
        });

        // Generate the authSig
        const authSig = await generateAuthSig({
            signer: ethWallet,
            toSign,
        });

        return authSig;
    }

    // Define the Lit resource
    const litResource = new LitAccessControlConditionResource('*');

    // Get the session signatures
    const sessionSigs = await client.getSessionSigs({
        chain: chain,
        resourceAbilityRequests: [
            {
                resource: litResource,
                ability: LIT_ABILITY.AccessControlConditionDecryption,
            },
        ],
        authNeededCallback
    });
    return sessionSigs;
}


async function decrypt(ciphertext: any, dataToEncryptHash: any) {
    // Get the session signatures
    const sessionSigs = await getSessionSignatures();
    const client = new LitJsSdk.LitNodeClient({
        alertWhenUnauthorized: false,
        debug: false,
        litNetwork: LIT_NETWORK.DatilDev,
    });
    await client.connect();
    // Decrypt the message
    const decryptedString = await decryptToString(
        {
            accessControlConditions,
            chain,
            ciphertext,
            dataToEncryptHash,
            sessionSigs,
        },
        client
    );
    await client.disconnect();
    // Return the decrypted string
    return { decryptedString };
}

export { decrypt };