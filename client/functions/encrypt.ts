import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { encryptString } from "@lit-protocol/encryption";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { accessControlConditions } from "../constants/accesControlConditions";

async function encrypt(message: string) {
    const client = new LitJsSdk.LitNodeClient({
        alertWhenUnauthorized: false,
        debug: false,
        litNetwork: LIT_NETWORK.DatilDev,
    });
    await client.connect();
    // Encrypt the message
    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
            accessControlConditions,
            dataToEncrypt: message,
        },
        client,
    );
    await client.disconnect();
    // Return the ciphertext and dataToEncryptHash
    return {
        ciphertext,
        dataToEncryptHash,
    };
}

export default encrypt;