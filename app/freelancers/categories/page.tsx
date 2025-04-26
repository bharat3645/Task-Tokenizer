import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CategoriesPage() {
  // This would typically come from your API/database
  const categories = [
    {
      name: "Smart Contract Development",
      description: "Expert developers specializing in secure smart contract creation and auditing",
      freelancers: 234,
    },
    {
      name: "DApp Development",
      description: "Full-stack developers building decentralized applications",
      freelancers: 189,
    },
    {
      name: "Blockchain Architecture",
      description: "System architects designing scalable blockchain solutions",
      freelancers: 156,
    },
    {
      name: "NFT Development",
      description: "Specialists in creating and deploying NFT collections",
      freelancers: 203,
    },
    {
      name: "Token Development",
      description: "Experts in creating and deploying custom tokens and cryptocurrencies",
      freelancers: 167,
    },
    {
      name: "Web3 Integration",
      description: "Developers specializing in integrating Web3 functionality into existing applications",
      freelancers: 145,
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
          <h1 className="mt-4 text-3xl font-bold text-white">Browse by Category</h1>
          <p className="mt-2 text-gray-400">Find freelancers by service category</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.name} className="bg-gray-900 border-gray-800 transition-colors hover:border-gray-700">
              <CardHeader>
                <h2 className="text-xl font-semibold text-white">{category.name}</h2>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-400">{category.description}</p>
                <p className="text-sm text-gray-500">{category.freelancers} active freelancers</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}