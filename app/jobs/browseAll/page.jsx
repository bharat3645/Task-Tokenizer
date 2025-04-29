"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { useWallet } from "@/context/WalletContext";
import {
  ArrowUpRight,
  Clock,
  DollarSign,
  LockKeyhole,
  LockKeyholeOpen,
  LockOpen,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { account, signer, connectWallet } = useWallet();
  const providerUrl = process.env.NEXT_PUBLIC_PROVIDER_URL ?? `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`;
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const contractAbi = [
    "function jobCounter() view returns (uint256)",
    "function jobs(uint256) view returns (address client, string description, uint256 budget, bool isOpen, address freelancer)",
  ]; // Replace with your contract ABI

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      if (!provider) {
        console.error("Provider not available");
        return;
      }

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      try {
        const jobCountBN = await contract.jobCounter();
        const jobCount = jobCountBN.toNumber();
        const tempJobs = [];

        for (let i = 1; i <= jobCount; i++) {
          const jobData = await contract.jobs(i);
          tempJobs.push({
            id: i,
            client: jobData.client,
            description: jobData.description,
            budget: ethers.utils.formatEther(jobData.budget),
            isOpen: jobData.isOpen,
            freelancer: jobData.freelancer,
          });
        }

        setJobs(tempJobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [provider]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 pt-20"
    >
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : jobs.length > 0 ? (
          jobs.map((gig) => (
            <div
              key={gig.id}
              className="group relative bg-card rounded-lg overflow-hidden border border-[hsl(var(--border))] p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {gig.description}
                  </h3>
                  <ArrowUpRight
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                    size={20}
                  />
                </div>

                <div className="pt-4 space-y-3 border-t border-[hsl(var(--border))]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-medium text-card-foreground text-xs">
                      Posted by: {gig.client}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-medium text-card-foreground">
                      {gig.budget} ETH
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={18} />
                    <span>Remote</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {gig?.isOpen ? (
                      <LockKeyholeOpen size={18} />
                    ) : (
                      <LockKeyhole size={18} />
                    )}
                    <span
                      className={`${
                        gig?.isOpen ? "bg-green-400" : "bg-red-400"
                      } px-4 rounded-xl text-xs text-[#FFFFFF]`}
                    >
                      {gig?.isOpen
                        ? "Open"
                        : `Accepted by: ${gig.freelancer} `}
                    </span>
                  </div>
                </div>
                <Link href={`/jobs/${gig.id}`}>
                  <button
                    className={`w-full mt-4 py-2 px-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground ${
                      !gig.isOpen && "cursor-not-allowed disabled:opacity-50"
                    }`}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No jobs available.</p>
        )}
      </div>
    </motion.div>
  );
}
