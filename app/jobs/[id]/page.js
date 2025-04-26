"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { ArrowLeft, LockKeyhole, LockKeyholeOpen, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

function GigDetails() {
  const [jobs, setJobs] = useState([]);
  const { account, signer, connectWallet } = useWallet();
  const providerUrl = process.env.NEXT_PUBLIC_PROVIDER_URL ?? `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`;
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const contractAbi = [
    "function jobCounter() view returns (uint256)",
    "function jobs(uint256) view returns (address client, string description, uint256 budget, bool isOpen, address freelancer)",
    "function acceptJob(uint256 _jobId) external",
    "function releaseFunds(uint256 _jobId) external",
  ]; // Replace with your contract ABI

  useEffect(() => {
    const fetchJobs = async () => {
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
        const jobCounter = await contract.jobCounter();
        const jobs = [];

        for (let i = 1; i <= jobCounter; i++) {
          const jobData = await contract.jobs(i);
          jobs.push({
            id: i,
            client: jobData.client,
            description: jobData.description,
            budget: ethers.utils.formatEther(jobData.budget),
            isOpen: jobData.isOpen,
            freelancer: jobData.freelancer,
          });
        }

        setJobs(jobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
    console.log(account);
  }, [provider]);

  const { id } = useParams();
  const router = useRouter();
  const gig = jobs.find((g) => g.id === Number(id));

  const handleAcceptJob = async () => {
    if (!signer) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const tx = await contract.acceptJob(Number(id));
      await tx.wait();
      console.log("Job accepted:", tx);
      router.push("/jobs/browseAll");
    } catch (err) {
      console.error("Failed to accept job:", err);
    }
  };

  const handleReleaseFunds = async () => {
    if (!signer) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const tx = await contract.releaseFunds(Number(id), {
        gasLimit: 20000000, // Set a manual gas limit
      });
      await tx.wait();
      console.log("Funds released:", tx);
      router.push("/jobs/browseAll");
    } catch (err) {
      console.error("Failed to release funds:", err);
      console.error("Error details:", err.error);
    }
  };

  if (!gig) {
    return (
      <div className="max-w-7xl pt-20 mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Loading...</h2>
          <button
            onClick={() => router.push("/jobs/browseAll")}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Gigs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => router.push("/jobs/browseAll")}
        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        Back to Gigs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card rounded-lg p-6 border border-[hsl(var(--border))]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-card-foreground mb-2">
                  {gig.description}
                </h1>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  {gig.budget}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-medium text-card-foreground text-xs">
                    Posted by: {gig.client}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 justify-center ">
              <div className="flex items-center gap-2 text-muted-foreground">
                <p className="font-bold">Job Location: </p>
                <span className="font-bold">Remote</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <p className="font-bold">Status: </p>
                <span
                  className={`${
                    gig?.isOpen ? "bg-green-400" : "bg-red-400"
                  } px-4 rounded-xl text-[#FFFFFF]`}
                >
                  {gig?.isOpen ? "Open" : `Accepted by: ${gig.freelancer}`}
                </span>
              </div>
              {gig?.isOpen && (
                <div className="flex items-center self-center gap-2 text-muted-foreground">
                  <button
                    type="button"
                    className="bg-primary text-primary-foreground p-2 rounded-lg"
                    onClick={handleAcceptJob}
                  >
                    Accept Job
                  </button>
                </div>
              )}
              {console.log(gig.client?.toLowerCase())}
              {account?.toLowerCase() === gig.freelancer?.toLowerCase() && (
                <div className="flex items-center self-center gap-2 text-muted-foreground">
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg"
                    placeholder="Your project link..."
                  />
                  <button
                    type="button"
                    className="bg-primary text-primary-foreground p-2 rounded-lg"
                  >
                    Submit for review
                  </button>
                </div>
              )}
              {gig?.freelancer &&
                gig.freelancer !==
                  `0x0000000000000000000000000000000000000000` &&
                account?.toLowerCase() === gig.client?.toLowerCase() && (
                  <div className="flex items-center self-center gap-2 text-muted-foreground w-full">
                    <button
                      type="button"
                      className="bg-primary text-primary-foreground p-2 rounded-lg w-full"
                      onClick={handleReleaseFunds}
                    >
                      Release Funds
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GigDetails;
