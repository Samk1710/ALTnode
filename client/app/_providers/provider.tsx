"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { privyConfig } from './privyConfig';
import { config } from './wagmi';
import "dotenv/config";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;
    return (
        <PrivyProvider
            appId={appId}
            config={privyConfig}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={config}>{children}</WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    );
}