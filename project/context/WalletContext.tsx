import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface WalletContextProps {
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  connectWallet: () => Promise<void>;
  network: string | null;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();
        
        setAccount(accounts[0]);
        setProvider(provider);
        setSigner(signer);
        setNetwork(network.name);
        
        toast.success("Wallet connected successfully!");
        console.log("Connected account:", accounts[0]);
        console.log("Network:", network.name);
      } catch (err) {
        console.error("Failed to connect wallet:", err);
        toast.error("Failed to connect wallet. Please try again.");
      }
    } else {
      console.error("MetaMask is not installed");
      toast.error("Please install MetaMask to use this application.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      // Handle account changes
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
        if (!accounts[0]) {
          toast.info("Wallet disconnected");
        } else {
          toast.info("Account changed");
        }
      });

      // Handle network changes
      window.ethereum.on("chainChanged", async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        setNetwork(network.name);
        toast.info(`Network changed to ${network.name}`);
      });

      // Check if already connected
      const checkConnection = async () => {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            
            setAccount(accounts[0]);
            setProvider(provider);
            setSigner(signer);
            setNetwork(network.name);
          }
        } catch (err) {
          console.error("Error checking connection:", err);
        }
      };

      checkConnection();

      return () => {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      };
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ account, provider, signer, connectWallet, network }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
