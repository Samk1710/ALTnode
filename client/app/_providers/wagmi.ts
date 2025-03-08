"use client";

import { createConfig } from "@privy-io/wagmi";
import { Chain } from "wagmi/chains";
import { http, createStorage, cookieStorage } from "wagmi"
import { defineChain } from "viem";

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
});;

const chains: readonly [Chain, ...Chain[]] = [
  educhain,
];

export const config = createConfig({
  chains,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [educhain.id]: http(),
  },
  ssr: false,
});
