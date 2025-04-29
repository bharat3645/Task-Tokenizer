"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";

export default function PostJobPage() {
  const [jobName, setJobName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const { account, provider, signer, connectWallet } = useWallet();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signer) {
      console.error("Wallet not connected");
      return;
    }
    if (!jobName.trim()) {
      console.error("Job name is required");
      return;
    }
    if (!/^\d+(\.\d+)?$/.test(budget)) {
      console.error("Invalid budget value");
      return;
    }

    try {
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      const contractAbi = [
        "function postJob(string calldata _description, uint256 _budget) external",
      ];
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      const tx = await contract.postJob(description, ethers.utils.parseEther(budget));
      await tx.wait();
      console.log("Job posted on-chain:", tx);

      setJobName("");
      setDescription("");
      setBudget("");
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting job:", err);
    }
  };

  return (
    <div className="p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      {!account ? (
        <>
          <button onClick={connectWallet} className="bg-blue-500 text-white p-2 rounded">
            Connect Wallet
          </button>
          <p>Connect your wallet to post a job.</p>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4 space-y-4">
          <div>
            <label className="block font-medium">Job Name:</label>
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Job Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Budget (ETH):</label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Post Job
          </button>
        </form>
      )}
      {isSubmitted && <p className="text-green-500">Job successfully submitted!</p>}
    </div>
  );
}
