import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobsPage() {
  return (
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
          <Card>
            <CardHeader>
              <CardTitle>Website Development</CardTitle>
              <CardDescription>Due in 5 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p>Client: Web3 Studio</p>
                  <p className="text-sm text-muted-foreground">Budget: 2 ETH</p>
                </div>
                <Button>View Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Audit</CardTitle>
              <CardDescription>Completed on Jan 15, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p>Client: DeFi Protocol</p>
                  <p className="text-sm text-muted-foreground">Earned: 1.5 ETH</p>
                </div>
                <Button variant="secondary">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}