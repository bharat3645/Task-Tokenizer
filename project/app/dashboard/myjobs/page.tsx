"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobDetailsDialog } from "@/components/job-details-dialog"
import { useState } from "react"

// Sample job data
const activeJobs = [
  {
    id: 1,
    title: "Website Development",
    client: "Web3 Studio",
    budget: "2 ETH",
    dueDate: "5 days",
    status: "active" as const,
    description: "Development of a modern web3-enabled website for a decentralized application. The website should integrate with various blockchain networks and provide a seamless user experience.",
    requirements: [
      "Experience with React and Next.js",
      "Knowledge of Web3 technologies and blockchain integration",
      "Proficiency in TypeScript and smart contract integration",
      "Understanding of UI/UX best practices",
      "Experience with responsive design"
    ],
    benefits: [
      "Competitive payment in ETH",
      "Potential for long-term collaboration",
      "Portfolio-worthy project",
      "Direct communication with the client",
      "Flexible working hours"
    ]
  }
]

const completedJobs = [
  {
    id: 2,
    title: "Smart Contract Audit",
    client: "DeFi Protocol",
    budget: "1.5 ETH",
    completedDate: "Jan 15, 2024",
    status: "completed" as const,
    description: "Comprehensive security audit of smart contracts for a DeFi protocol. The audit included code review, vulnerability assessment, and optimization recommendations.",
    requirements: [
      "Deep understanding of Solidity",
      "Experience with smart contract security",
      "Knowledge of common attack vectors",
      "Ability to write detailed audit reports",
      "Experience with testing frameworks"
    ],
    benefits: [
      "Payment in ETH",
      "Recognition in the audit report",
      "Future audit opportunities",
      "Network with DeFi projects",
      "Flexible schedule"
    ]
  }
]

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<(typeof activeJobs[0] | typeof completedJobs[0]) | null>(null)

  return (
    <>
      <div className="space-y-6 pt-32 px-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Jobs</h1>
          <p className="text-muted-foreground">View and manage your active and completed jobs</p>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Jobs</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            {activeJobs.map(job => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>Due in {job.dueDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p>Client: {job.client}</p>
                      <p className="text-sm text-muted-foreground">Budget: {job.budget}</p>
                    </div>
                    <Button onClick={() => setSelectedJob(job)}>View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {completedJobs.map(job => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>Completed on {job.completedDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p>Client: {job.client}</p>
                      <p className="text-sm text-muted-foreground">Earned: {job.budget}</p>
                    </div>
                    <Button variant="secondary" onClick={() => setSelectedJob(job)}>View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {selectedJob && (
        <JobDetailsDialog
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          job={selectedJob}
        />
      )}
    </>
  )
}