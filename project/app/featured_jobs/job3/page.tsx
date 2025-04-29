"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Job3() {
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
          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">Data Science</span>
          <span className="text-xl font-semibold">4 ETH</span>
        </div>

        <h1 className="mb-4 text-3xl font-bold">Blockchain Data Analyst</h1>

        <div className="mb-8 space-y-4 text-muted-foreground">
          <p>
            We are looking for a skilled data analyst to help us understand on-chain data and provide valuable insights for our decentralized application. This role combines traditional data analysis with blockchain expertise.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Requirements:</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>3+ years of experience in data analysis</li>
            <li>Proficiency in SQL and Python</li>
            <li>Experience with blockchain data tools (The Graph, Dune Analytics)</li>
            <li>Understanding of DeFi protocols and metrics</li>
            <li>Strong visualization and reporting skills</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">Responsibilities:</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Analyze on-chain data and user behavior</li>
            <li>Create dashboards and reports</li>
            <li>Monitor key protocol metrics</li>
            <li>Develop data-driven insights and recommendations</li>
            <li>Collaborate with the team on protocol improvements</li>
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
