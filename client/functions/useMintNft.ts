import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import {
  BaseError,
  ContractFunctionRevertedError,
  ContractFunctionExecutionError,
  EstimateGasExecutionError,
  ChainMismatchError,
} from "viem";

import { abi, contractAddress } from "@/app/abi";

// Utility function for error handling
const logError = (error: unknown) => {
  if (error instanceof BaseError) {
    console.error("Base Error:", error.message);
    console.log("Error:", error);

    // Walk through error causes
    let cause = error.cause;
    while (cause) {
      console.error("Cause:", cause);
      cause = (cause as any).cause;
    }

    // Handle specific error types
    if (error instanceof ContractFunctionRevertedError) {
      console.error("Transaction was reverted by the contract");
      return;
    }
    if (error instanceof ContractFunctionExecutionError) {
      console.error("Failed to execute contract function");
      return;
    }
    if (error instanceof EstimateGasExecutionError) {
      console.error("Failed to estimate gas");
      return;
    }
    if (error instanceof ChainMismatchError) {
      console.error("Please connect to the correct network");
      return;
    }
  }

  console.error("An unexpected error occurred");
  console.error("Unknown Error:", error);
};

// Hook for minting assets
export function useMintAsset() {
  const {
    writeContractAsync,
    data: hash,
    error,
    isPending,
  } = useWriteContract();

  // Wait for transaction receipt
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
  });

  const mintAsset = async (
    address: `0x${string}` | undefined,
    tokenMetadata: string,
    assetUri: string,
    price: BigInt
  ) => {
    try {
      if (!address) {
        throw new Error("No wallet address provided");
      }

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi,
        functionName: "mintAsset",
        args: [address, tokenMetadata, assetUri, price],
      });

      return txHash;
    } catch (error) {
      logError(error);
      throw error;
    }
  };

  return {
    mintAsset,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    confirmError,
  };
}

// Hook for purchasing subscriptions
export function usePurchaseSubscription() {
  const {
    writeContractAsync,
    data: hash,
    error,
    isPending,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
  });

  const purchaseSubscription = async (assetId: BigInt, duration: BigInt, price: bigint) => {
    try {
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi,
        functionName: "purchaseSubscription",
        value: price,
        args: [assetId, duration],
      },
        {
          onError(error) {
            console.error("Transaction error:", error);
            console.log("Error:", error);
          },
          onSettled(data, error) {
            if (error) {
              console.error("Error on settlement:", error);
            } else {
              console.log("Transaction settled:", data);
            }
          },
          onSuccess(data) {
            console.log("Transaction successful!", data);
          },
        }
      );

      return txHash;
    } catch (error) {
      console.log("Error:", error);
      logError(error);
      throw error;
    }
  };

  return {
    purchaseSubscription,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    confirmError,
  };
}

// Hook for reading contract data
// Hook for reading contract data
export function useContractRead() {
  return {
    useAccessKey: (tokenId: BigInt, address: string) =>
      useReadContract({
        address: contractAddress,
        abi,
        functionName: "getAccessKeyByTokenId",
        args: [tokenId, address],
      }),
    useTokenURI: (accessKey: string, address: string) =>
      useReadContract({
        address: contractAddress,
        abi,
        functionName: "getTokenURIByAccessKey",
        args: [accessKey, address],
      }),
    getSubscriptions: (address: `0x${string}` | undefined) =>
      useReadContract({
        address: contractAddress,
        abi,
        functionName: "getSubscriptions",
        args: [address],
      })
  };
}
