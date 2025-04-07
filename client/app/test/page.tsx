"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

export default function Page() {
  const { isConnected, address } = useAccount();

  return (
    <div>
      <h1>Hello World</h1>
      <ConnectKitButton />
      {isConnected && <p>Connected! with {address}</p>}
    </div>
  );
}