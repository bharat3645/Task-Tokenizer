import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EscrowPage() {
  return (
    <div className="space-y-6 pt-32 px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Escrow</h1>
        <p className="text-muted-foreground">Manage your escrow payments and transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all hover:scale-105">
          <CardHeader>
            <CardTitle>Active Escrows</CardTitle>
            <CardDescription>Currently held in escrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5 ETH</div>
            <p className="text-xs text-muted-foreground">Across 2 active contracts</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:scale-105">
          <CardHeader>
            <CardTitle>Released</CardTitle>
            <CardDescription>Total funds released</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8 ETH</div>
            <p className="text-xs text-muted-foreground">From 8 completed contracts</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:scale-105">
          <CardHeader>
            <CardTitle>Pending Release</CardTitle>
            <CardDescription>Awaiting client approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5 ETH</div>
            <p className="text-xs text-muted-foreground">From 1 completed job</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Website Development Milestone 1</p>
                <p className="text-sm text-muted-foreground">Released on Jan 20, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">1.0 ETH</p>
                <p className="text-sm text-green-500">Completed</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Smart Contract Development</p>
                <p className="text-sm text-muted-foreground">Pending release</p>
              </div>
              <div className="text-right">
                <p className="font-medium">1.5 ETH</p>
                <p className="text-sm text-yellow-500">In Escrow</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}