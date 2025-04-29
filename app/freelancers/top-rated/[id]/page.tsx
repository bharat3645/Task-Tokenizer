import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Freelancer {
  id: number;
  name: string;
  rating: number;
  completedJobs: number;
  skills: string[];
  image: string;
}

const topFreelancers: Freelancer[] = [
  { id: 1, name: "Alex Thompson", rating: 4.9, completedJobs: 183, skills: ["Smart Contracts", "Solidity", "Web3"], image: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Sarah Chen", rating: 4.8, completedJobs: 167, skills: ["DApp Development", "React", "Ethereum"], image: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "David Lee", rating: 4.7, completedJobs: 150, skills: ["NFT Development", "JavaScript", "IPFS"], image: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Emily Rodriguez", rating: 4.6, completedJobs: 120, skills: ["Blockchain Consulting", "Strategy", "Tokenomics"], image: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Michael Brown", rating: 4.5, completedJobs: 95, skills: ["Smart Contract Audits", "Security", "Solidity"], image: "/placeholder.svg?height=40&width=40" },
];

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const freelancer = topFreelancers.find((f) => f.id === id);

  if (!freelancer) {
    return (
      <div className="p-4 pt-20">
        <h1 className="text-2xl font-bold mb-4">Freelancer Not Found</h1>
        <Link href="/freelancers/top-rated">
          <Button variant="ghost">Back to Top Rated</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link href="/freelancers/top-rated">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
        </div>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex items-center gap-4 p-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={freelancer.image} alt={freelancer.name} />
              <AvatarFallback>
                {freelancer.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-white">{freelancer.name}</h1>
              <p className="text-gray-400 mt-1">★ {freelancer.rating} • {freelancer.completedJobs} jobs completed</p>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-white mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((skill) => (
                <Badge key={skill} className="bg-gray-800 text-gray-200">{skill}</Badge>
              ))}
            </div>
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-2">About</h2>
              <p className="text-gray-300">{freelancer.name} is an experienced blockchain professional specializing in {freelancer.skills.join(", ")}.</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
