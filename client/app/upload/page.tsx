"use client";

import { useEffect, useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { TextViewer } from "@/components/text-viewer";
import { Documentation } from "@/components/documentation";
import { ImageSection } from "@/components/image-section";
import Navbar from "@/components/functions/NavBar";
import { cn } from "@/lib/utils";
import { generateCreature } from "@/constants/genAI";
import { PinataSDK } from "pinata-web3";
import AnimatedBackground from "@/components/functions/AnimatedBackground";
import Particles from "@/components/ui/particles";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useMintAsset } from "@/functions/useMintNft";
import encrypt from "@/functions/encrypt";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

interface MintNFTProps {
  enabled: boolean;
  mintNft: (name: string, price: number) => Promise<`0x${string}` | undefined>;
  isConfirming: boolean;
}

export default function Home() {
  const [fileContent, setFileContent] = useState<string>("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [documentation, setDocumentation] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const account = useAccount();
  const address = account ? account.address : undefined;

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const {
    mintAsset,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    confirmError,
  } = useMintAsset();

  const genImage = async (): Promise<Blob | null> => {
    console.log("File content length: ", fileContent.length);
    console.log("File content: ", fileContent);
    const charCount = fileContent.length;
    let rarity: "common" | "rare" | "epic" | "legendary";

    if (charCount < 2000) {
      rarity = "common";
    } else if (charCount < 5000) {
      rarity = "rare";
    } else if (charCount < 10000) {
      rarity = "epic";
    } else {
      rarity = "legendary";
    }
    const blob = await generateCreature("codex", rarity);
    return blob;
  };

  const mintNft = async (
    name: string,
    price: number
  ): Promise<`0x${string}` | undefined> => {
    try {
      console.log("Minting NFT...");

      // Upload the image to IPFS
      const imageUpload = await pinata.upload.url(imageUrl);
      const img = `https://ipfs.io/ipfs/${imageUpload.IpfsHash}`;
      console.log("Image uploaded to IPFS: ", img);

      // Create a Blob from the fileContent
      const datasetBlob = new Blob([fileContent], { type: "text/plain" });

      // Upload the dataset file to IPFS
      const datasetFile = new File([datasetBlob], `${name}.txt`);
      const datasetUpload = await pinata.upload.file(datasetFile);
      const datasetIpfsUrl = `https://ipfs.io/ipfs/${datasetUpload.IpfsHash}`;
      console.log("Dataset uploaded to IPFS: ", datasetIpfsUrl);
      const {ciphertext, dataToEncryptHash} = await encrypt(datasetIpfsUrl);

      // Create metadata with the dataset file URL
      const metadata = {
        name: name,
        description: documentation,
        price: price,
        owner: address,
        image: img,
        encryptedPipelineUrl: ciphertext,
        encryptedKey: dataToEncryptHash,
        attributes: [
          {
            trait_type: "nft_type",
            value: "dataset",
          },
        ],
      };

      // Upload metadata to IPFS
      const metadataUpload = await pinata.upload.json(metadata);
      const metadataIpfsUrl = `https://ipfs.io/ipfs/${metadataUpload.IpfsHash}`;
      console.log("Metadata uploaded to IPFS: ", metadataIpfsUrl);

      // Mint NFT using the metadata URL
      console.log("Minting NFT with metadata: ", metadataIpfsUrl);
      const txHash = await mintAsset(
        address,
        metadataIpfsUrl,
        datasetIpfsUrl,
        BigInt(price * 10 ** 18 || 0)
      );
      console.log(txHash);

      await pinata.unpin([
        imageUpload.IpfsHash,
        datasetUpload.IpfsHash,
        metadataUpload.IpfsHash,
      ])

      return txHash;
    } catch (error) {
      console.error("Error during minting process: ", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      {isMounted && (
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          refresh
        />
      )}
      <Navbar />
      <div
        className={cn(
          "transition-all duration-500 ease-in-out",
          isUploaded ? "scale-0 hidden" : "scale-100"
        )}
      >
        <FileUpload
          onFileContent={setFileContent}
          onUploadComplete={() => setIsUploaded(true)}
        />
      </div>

      {isUploaded && (
        <div className="container mx-auto p-6 space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TextViewer content={fileContent} setContent={setFileContent} />
            </div>
            <div className="lg:col-span-1">
              <Documentation
                value={documentation}
                onChange={setDocumentation}
              />
              <ImageSection
                onImageUpload={setImageUrl}
                imageUrl={imageUrl}
                genImage={genImage}
              />
              <MintNFT
                enabled={!!imageUrl && !!fileContent && !!documentation}
                mintNft={mintNft}
                isConfirming={isPending || isConfirming}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function MintNFT({ enabled, mintNft, isConfirming }: MintNFTProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleMint = async (name: string, price: number) => {
    try {
      setIsMinting(true);
      setIsUploading(true);
      const hash = await mintNft(name, price);
      setIsUploading(false);

      if (hash) {
        setIsMinting(false);
        setOpen(false); // Close the dialog on successful mint
        setPrice(0); // Reset the form
        setName("");
      }

      if (!hash) {
        setIsMinting(false);
        alert("Minting failed!");
        return;
      }
    } catch (error) {
      setIsUploading(false);
      setIsMinting(false);
      alert("Error during minting process!");
    }
  };

  const getButtonText = () => {
    if (isUploading) return "Uploading to IPFS...";
    if (isConfirming || isMinting) return "Minting...";
    return "Mint Dataset NFT";
  };

  return (
    <div className="flex justify-center mt-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 z-50"
          >
            <Coins className="w-5 h-5 mr-2" />
            Mint Dataset 🚀
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-xl px-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-lg shadow-lg">
          <DialogTitle className="text-center text-lg sm:text-xl">
            Mint NFT
          </DialogTitle>
          <div className="flex flex-col space-y-4 justify-center items-center">
            <Input
              type="number"
              placeholder="Set Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full sm:w-3/4"
            />
            <Input
              type="text"
              placeholder="Set Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full sm:w-3/4"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => handleMint(name, price)}
              disabled={!enabled || isMinting || isConfirming || isUploading}
              className="w-full sm:w-auto px-6 py-2"
            >
              {getButtonText()}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
