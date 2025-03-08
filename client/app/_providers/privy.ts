import { http, createStorage } from "wagmi";
import { sepolia, mainnet, baseSepolia, polygonAmoy } from "wagmi/chains";
import { connectors } from "./wallets";
import { Chain } from "@rainbow-me/rainbowkit";
import { createConfig } from "@privy-io/wagmi";

const chains: readonly [Chain, ...Chain[]] = [
  sepolia,
  mainnet,
  baseSepolia,
  polygonAmoy,
];

const isClient = typeof window !== "undefined";

export const newConfig = createConfig({
  chains,
  connectors,
  storage: createStorage({
    storage: isClient ? window.localStorage : undefined,
  }),
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
    [polygonAmoy.id]: http(),
  },
  ssr: false,
});
