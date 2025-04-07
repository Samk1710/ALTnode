"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useDisconnect, useReadContract, useBalance } from "wagmi";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { formatEther } from "viem";
import { tokenAbi, tokenAddress } from "@/app/abi";
import { educhain } from "@/app/_providers/wagmi";

export default function LoginButton() {
    const { ready, authenticated, login, logout, user } = usePrivy();
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [tokenBalance, setTokenBalance] = useState<string | null>(null);
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const balance = useBalance({
        address: address,
        chainId: educhain.id,
    });

    const result = useReadContract({
        abi: tokenAbi,
        address: tokenAddress,
        functionName: 'balanceOf',
        args: [userAddress],
    })

    useEffect(() => {
        if (address) {
            setUserAddress(address || user?.wallet?.address);
            setTokenBalance(result.data ? result.data.toString() : '0');
        }
    }, [address, result]);

    const handleLogout = () => {
        logout();
        disconnect();
        setUserAddress(null);
    };

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const walletAddress = address || user?.wallet?.address;

    const handleLogin = async () => {
        login();
    }

    if (!ready || !authenticated || !userAddress || !user?.wallet?.address || !walletAddress) {
        return <Button onClick={() => handleLogin()}>Connect Wallet</Button>;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" className="justify-between">
                    {truncateAddress(userAddress || user?.wallet?.address)}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex-col items-start">
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start">
                    <div className="font-medium">$AiT</div>
                    <div className="text-xs text-muted-foreground">
                        {tokenBalance ? Number(formatEther(BigInt(tokenBalance))).toFixed(3) : 0}
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start">
                    <div className="font-medium">Balance</div>
                    <div className="text-xs text-muted-foreground">
                        {balance.data?.value
                            ? Number(formatEther(balance.data.value)).toFixed(3)
                            : 0}{" "}
                        {balance.data?.symbol}
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    Disconnect
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
