"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
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

    // Validate the budget input
    if (!/^\d+(\.\d+)?$/.test(budget)) {
      console.error("Invalid budget value");
      return;
    }

    try {
      const contractAddress = "0x0b06c1988aDB165202aC09E25Cc1d55a282034D3"; // Replace with your contract address
      const contractAbi = [
        "function postJob(string calldata _description, uint256 _budget) external",
      ]; // Replace with your contract ABI

      const escrowContractAddress =
        "0x3Ff5e18C562Bf2154f4106bD84593a176A4E0f70"; // Replace with your escrow contract address
      const escrowContractAbi = [
        "function createEscrow(address _client, uint256 _amount) external payable",
      ]; // Replace with your escrow contract ABI

      // Post the job
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const tx = await contract.postJob(
        description,
        ethers.utils.parseEther(budget)
      );
      await tx.wait();
      console.log("Job posted:", tx);

      // Trigger the payment using the escrow contract
      const escrowContract = new ethers.Contract(
        escrowContractAddress,
        escrowContractAbi,
        signer
      );
      const escrowTx = await escrowContract.createEscrow(
        account,
        ethers.utils.parseEther(budget),
        {
          value: ethers.utils.parseEther(budget),
        }
      );
      await escrowTx.wait();
      console.log("Payment triggered:", escrowTx);

      setDescription("");
      setBudget("");
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting job:", err);
    }
  };

  return (
    <div className="p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      {!account ? (
        <>
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Connect Wallet
          </button>
          <p>Connect your wallet to post a job.</p>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
          <div>
            <label className="block">Job Description:</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block">Budget (ETH):</label>
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
      <p>{isSubmitted && "Successfully submitted"}</p>
    </div>
  );
}
