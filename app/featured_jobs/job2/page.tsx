"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Job2() {
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
          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">Design</span>
          <span className="text-xl font-semibold">3 ETH</span>
        </div>

        <h1 className="mb-4 text-3xl font-bold">NFT Marketplace Designer</h1>

        <div className="mb-8 space-y-4 text-muted-foreground">
          <p>
            We're looking for a creative UI/UX designer to help craft unique and engaging user interfaces for our upcoming NFT marketplace. This role combines web3 knowledge with cutting-edge design principles.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Requirements:</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>5+ years of UI/UX design experience</li>
            <li>Strong portfolio showcasing web3 projects</li>
            <li>Proficiency in Figma and other design tools</li>
            <li>Understanding of NFT marketplaces and web3 UX patterns</li>
            <li>Experience with responsive design and mobile-first approaches</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">Responsibilities:</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Design intuitive interfaces for NFT browsing and trading</li>
            <li>Create engaging visual elements for the marketplace</li>
            <li>Develop and maintain the design system</li>
            <li>Collaborate with developers on implementation</li>
            <li>Conduct user research and usability testing</li>
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
