"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Users, Wallet, Code, Paintbrush, Database } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

type Job = {
  id: string
  title: string
  category: string
  price: string
  description: string
  skills: string[]
}

type Freelancer = {
  id: string
  name: string
  role: string
  rating: number
  skills: string[]
  completedJobs: number
  hourlyRate: string
}

const allJobs: Job[] = [
  {
    id: "1",
    title: "DeFi Protocol Developer",
    category: "Smart Contract",
    price: "5 ETH",
    description: "Experienced Solidity developer needed to contribute in smart contract deployments and to shape the future of decentralized finance.",
    skills: ["Solidity", "Smart Contracts", "DeFi", "Web3.js", "Security Auditing"]
  },
  {
    id: "2",
    title: "NFT Marketplace Designer",
    category: "Design",
    price: "3 ETH",
    description: "Seeking a creative designer to craft unique and engaging user interfaces for our upcoming NFT marketplace.",
    skills: ["UI/UX", "Figma", "Web Design", "NFT", "Responsive Design"]
  },
  {
    id: "3",
    title: "Blockchain Data Analyst",
    category: "Data Science",
    price: "4 ETH",
    description: "We need a data analyst to help us understand on-chain data and provide insights for our decentralized application.",
    skills: ["Python", "SQL", "Data Analysis", "Blockchain", "The Graph"]
  },
  {
    id: "4",
    title: "Smart Contract Auditor",
    category: "Security",
    price: "6 ETH",
    description: "Looking for an experienced smart contract auditor to review and secure our protocol implementations.",
    skills: ["Security", "Solidity", "Auditing", "DeFi", "Testing"]
  },
  {
    id: "5",
    title: "Frontend Web3 Developer",
    category: "Frontend",
    price: "4 ETH",
    description: "Seeking a frontend developer with Web3 experience to build intuitive dApp interfaces.",
    skills: ["React", "TypeScript", "Web3.js", "Ethers.js", "UI/UX"]
  }
]

const freelancers: Freelancer[] = [
  {
    id: "1",
    name: "Alex Thompson",
    role: "Smart Contract Developer",
    rating: 4.9,
    skills: ["Solidity", "DeFi", "Security", "Web3.js"],
    completedJobs: 34,
    hourlyRate: "0.15 ETH"
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Blockchain Designer",
    rating: 4.8,
    skills: ["UI/UX", "NFT", "Figma", "Web Design"],
    completedJobs: 28,
    hourlyRate: "0.12 ETH"
  },
  {
    id: "3",
    name: "Michael Kumar",
    role: "Data Scientist",
    rating: 4.7,
    skills: ["Python", "Data Analysis", "The Graph", "SQL"],
    completedJobs: 22,
    hourlyRate: "0.14 ETH"
  },
  {
    id: "4",
    name: "Emma Wilson",
    role: "Security Auditor",
    rating: 5.0,
    skills: ["Security", "Auditing", "Solidity", "Testing"],
    completedJobs: 45,
    hourlyRate: "0.18 ETH"
  },
  {
    id: "5",
    name: "David Park",
    role: "Frontend Developer",
    rating: 4.8,
    skills: ["React", "TypeScript", "Web3", "UI/UX"],
    completedJobs: 31,
    hourlyRate: "0.13 ETH"
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'jobs' | 'freelancers'>('jobs')
  const [searchResults, setSearchResults] = useState<(Job | Freelancer)[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    const query = searchQuery.toLowerCase()

    if (searchType === 'jobs') {
      const filteredJobs = allJobs.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      )
      setSearchResults(filteredJobs)
    } else {
      const filteredFreelancers = freelancers.filter(freelancer =>
        freelancer.name.toLowerCase().includes(query) ||
        freelancer.role.toLowerCase().includes(query) ||
        freelancer.skills.some(skill => skill.toLowerCase().includes(query))
      )
      setSearchResults(filteredFreelancers)
    }
  }

  return (
    <div className="min-h-screen text-foreground">
      {/* Global background applied in root layout */}
      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-8">
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
          <p className="mx-auto mt-4 max-w-2xl text-center text-xl text-muted-foreground mb-16">
            "Empowering talent globally through blockchain technology, creating a borderless ecosystem for the future of work."
          </p>

          {/* Contributors Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Contributors</h2>
            <div className="grid grid-cols-4 gap-8">
              {/* Contributor 1 */}
              <div className="text-center">
                <div className="mx-auto w-[210px] h-[210px] rounded-full overflow-hidden mb-4">
                  <img
                    src="/images/bharat.jpeg"
                    alt="Bharat Singh Parihar"
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bharat Singh Parihar</h3>
                <p className="text-muted-foreground italic">Lead Developer</p>
              </div>

              {/* Contributor 2 */}
              <div className="text-center">
                <div className="mx-auto w-[210px] h-[210px] rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=210&h=210&fit=crop&crop=faces"
                    alt="Sarah Martinez"
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sharvit Kashikar</h3>
                <p className="text-muted-foreground italic">Backend Developer</p>
              </div>

              {/* Contributor 3 */}
              <div className="text-center">
                <div className="mx-auto w-[210px] h-[210px] rounded-full overflow-hidden mb-4">
                  <img
                    src="/images/rishab.jpeg"
                    alt="Michael Kumar"
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rishab Thutheja</h3>
                <p className="text-muted-foreground italic">Mern Stack Developer</p>
              </div>

              {/* Contributor 4 */}
              <div className="text-center">
                <div className="mx-auto w-[210px] h-[210px] rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=210&h=210&fit=crop&crop=faces"
                    alt="Emily Zhang"
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mahek Patel</h3>
                <p className="text-muted-foreground italic">UI/UX Designer</p>
              </div>
            </div>
          </div>

          {/* Search Type Toggle */}
          <div className="mx-auto mb-4 flex justify-center gap-2">
            <Button
              variant={searchType === 'jobs' ? 'default' : 'outline'}
              onClick={() => setSearchType('jobs')}
              className="w-32"
            >
              Jobs
            </Button>
            <Button
              variant={searchType === 'freelancers' ? 'default' : 'outline'}
              onClick={() => setSearchType('freelancers')}
              className="w-32"
            >
              Freelancers
            </Button>
          </div>

          <div className="mx-auto mb-12 flex max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder={`Search ${searchType}...`}
                className="h-12 pr-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value === '') {
                    setIsSearching(false)
                    setSearchResults([])
                  }
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setIsSearching(false)
                    setSearchResults([])
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <Button size="lg" className="h-12 px-8" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </motion.div>

        {/* Features */}
        {!isSearching && (
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
        )}

        {/* Search Results or Featured Content */}
        <motion.section
          id="featured-jobs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-16 scroll-mt-20"
        >
          <h2 className="mb-8 text-3xl font-bold">
            {isSearching
              ? `${searchType === 'jobs' ? 'Jobs' : 'Freelancers'} Results`
              : 'Featured Jobs'}
          </h2>

          {/* Jobs Grid */}
          {(!isSearching || searchType === 'jobs') && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(isSearching ? searchResults as Job[] : allJobs.slice(0, 3)).map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{job.category}</span>
                    <span className="font-semibold">{job.price}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{job.title}</h3>
                  <p className="mb-4 text-muted-foreground">{job.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link href={`/featured_jobs/job${job.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {/* Freelancers Grid */}
          {isSearching && searchType === 'freelancers' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(searchResults as Freelancer[]).map((freelancer) => (
                <Card key={freelancer.id} className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{freelancer.role}</span>
                    <span className="font-semibold">{freelancer.hourlyRate}/hr</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{freelancer.name}</h3>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span>{freelancer.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{freelancer.completedJobs} jobs completed</span>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {freelancer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full">View Profile</Button>
                </Card>
              ))}
            </div>
          )}

          {isSearching && searchResults.length === 0 && (
            <div className="text-center text-muted-foreground">
              No {searchType} found matching your search criteria.
            </div>
          )}
        </motion.section>
      </main>
    </div>
  )
}