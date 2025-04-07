"use client";

import { createConfig, http } from "wagmi";
import { defineChain } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { getDefaultConfig } from "connectkit";

export const educhain = defineChain({
  id: 656476,
  name: "Educhain",
  network: "educhain",
  nativeCurrency: {
    decimals: 18,
    name: "EduToken",
    symbol: "EDU",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital/"],
    },
  },

  blockExplorers: {
    default: { name: "OpenCampusCodex", url: "https://opencampus-codex.blockscout.com/" },
  },
  testnet: true,
});

export const config = createConfig(
  getDefaultConfig({
    enableFamily: false,
    chains: [educhain],
    transports: {
      // RPC URL for each chain
      [educhain.id]: http(),
    },
    storage: createStorage({
      storage: cookieStorage,
    }),

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "default_project_id",

    // Required App Info
    appName: "AltNode",

    // Optional App Info
    appDescription: "Decentralised AI Ecosystem",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png",
  })
);
