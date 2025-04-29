import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TopRatedPage() {
  const topFreelancers = [
    {
      id: 1,
      name: "Alex Thompson",
      rating: 4.9,
      completedJobs: 183,
      skills: ["Smart Contracts", "Solidity", "Web3"],
      image: "/placeholder.svg?height=40&width=40", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "Sarah Chen",
      rating: 4.8,
      completedJobs: 167,
      skills: ["DApp Development", "React", "Ethereum"],
      image: "/placeholder.svg?height=40&width=40", // Replace with actual image URLs
    },
    // Add more freelancers as needed
    {
      id: 3,
      name: "David Lee",
      rating: 4.7,
      completedJobs: 150,
      skills: ["NFT Development", "JavaScript", "IPFS"],
      image: "/placeholder.svg?height=40&width=40", // Replace with actual image URLs
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        rating: 4.6,
        completedJobs: 120,
        skills: ["Blockchain Consulting", "Strategy", "Tokenomics"],
        image: "/placeholder.svg?height=40&width=40", // Replace with actual image URLs
      },
      {
        id: 5,
        name: "Michael Brown",
        rating: 4.5,
        completedJobs: 95,
        skills: ["Smart Contract Audits", "Security", "Solidity"],
        image: "/placeholder.svg?height=40&width=40", // Replace with actual image URLs
      },
  ];

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link href="/browse">
            <Button variant="ghost" className="text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-white">
            Top Rated Freelancers
          </h1>
          <p className="mt-2 text-gray-400">
            Browse our highest-rated blockchain professionals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topFreelancers.map((freelancer) => (
            <Card
              key={freelancer.id}
              className="bg-gray-900 border-gray-800 transition duration-300 hover:scale-105"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={freelancer.image} alt={freelancer.name} />
                  <AvatarFallback>
                    {freelancer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {freelancer.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>★ {freelancer.rating}</span>
                    <span>•</span>
                    <span>{freelancer.completedJobs} jobs</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-gray-800 text-gray-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}