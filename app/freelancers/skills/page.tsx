import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SkillsPage() {
  // This would typically come from your API/database
  const skills = [
    {
      category: "Smart Contract Development",
      skills: ["Solidity", "Vyper", "Rust", "Smart Contract Security", "Contract Testing"],
    },
    {
      category: "Frontend Development",
      skills: ["React", "Web3.js", "Ethers.js", "DApp Development", "Wallet Integration"],
    },
    {
      category: "Blockchain Platforms",
      skills: ["Ethereum", "Binance Smart Chain", "Polygon", "Solana", "Avalanche"],
    },
    // Add more categories as needed
  ]

  return (
    <main className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link href="/browse">
            <Button variant="ghost" className="text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-white">Browse by Skills</h1>
          <p className="mt-2 text-gray-400">Search freelancers by specific skills and expertise</p>
        </div>

        <div className="mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search skills..."
            className="bg-gray-900 border-gray-800 pl-10 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="grid gap-8">
          {skills.map((category) => (
            <Card key={category.category} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <h2 className="mb-4 text-xl font-semibold text-white">{category.category}</h2>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-800 hover:text-white"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}