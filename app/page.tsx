"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Users, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const featuredJobs = [
  {
    id: "1",
    title: "DeFi Protocol Developer",
    category: "Smart Contract",
    price: "5 ETH",
    description:
      "Experienced Solidity developer needed to contribute in smart contract deployments and to shape the future of decentralized finance.",
  },
  {
    id: "2",
    title: "NFT Marketplace Designer",
    category: "Design",
    price: "3 ETH",
    description:
      "Seeking a creative designer to craft unique and engaging user interfaces for our upcoming NFT marketplace.",
  },
  {
    id: "3",
    title: "Blockchain Data Analyst",
    category: "Data Science",
    price: "4 ETH",
    description:
      "We need a data analyst to help us understand on-chain data and provide insights for our decentralized application.",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen text-foreground">
      {/* Global background applied in root layout */}
      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            The Future of{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Decentralized Work
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Connect, collaborate, and earn in the Web3 gig economy. Secure payments, transparent reputation, and endless
            opportunities.
          </p>

          <div className="mx-auto mb-12 flex max-w-md items-center gap-2">
            <Input placeholder="Search jobs or freelancers..." className="h-12" />
            <Button size="lg" className="h-12 px-8">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Card className="p-6 transition-all hover:scale-105">
            <Wallet className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Secure Payments</h3>
            <p className="text-muted-foreground">Smart contract escrow ensures safe and transparent transactions</p>
          </Card>
          <Card className="p-6 transition-all hover:scale-105">
            <TrendingUp className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">On-Chain Reputation</h3>
            <p className="text-muted-foreground">Build and maintain your professional reputation on the blockchain</p>
          </Card>
          <Card className="p-6 transition-all hover:scale-105">
            <Users className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Global Talent Pool</h3>
            <p className="text-muted-foreground">Connect with skilled professionals from around the world</p>
          </Card>
        </motion.div>

        {/* Featured Jobs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-16"
        >
          <h2 className="mb-8 text-3xl font-bold">Featured Jobs</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{job.category}</span>
                  <span className="font-semibold">{job.price}</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{job.title}</h3>
                <p className="mb-4 text-muted-foreground">{job.description}</p>
                <Link href="">
                  <Button className="w-full ">View Details</Button>
                </Link>
              </Card>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  )
}