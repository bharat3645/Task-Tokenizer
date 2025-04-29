"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Job1() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Link>
      </div>

      <Card className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">Smart Contract</span>
          <span className="text-xl font-semibold">5 ETH</span>
        </div>

        <h1 className="mb-4 text-3xl font-bold">DeFi Protocol Developer</h1>

        <div className="mb-8 space-y-4 text-muted-foreground">
          <p>
            We are seeking an experienced Solidity developer to join our team and contribute to the development of cutting-edge DeFi protocols. This is a unique opportunity to shape the future of decentralized finance.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Requirements:</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>3+ years of experience with Solidity and smart contract development</li>
            <li>Deep understanding of DeFi protocols and blockchain architecture</li>
            <li>Experience with testing frameworks like Hardhat and Truffle</li>
            <li>Strong knowledge of security best practices</li>
            <li>Familiarity with front-end integration (Web3.js/ethers.js)</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">Responsibilities:</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Design and implement smart contracts for DeFi protocols</li>
            <li>Conduct code reviews and security audits</li>
            <li>Optimize gas usage and contract efficiency</li>
            <li>Collaborate with the team on protocol architecture</li>
            <li>Write technical documentation</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Button size="lg" className="flex-1">
            <Wallet className="mr-2 h-4 w-4" /> Apply Now
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            Save Job
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
