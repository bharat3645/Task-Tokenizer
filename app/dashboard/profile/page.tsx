import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  return (
    <div className="space-y-6 pt-32 px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Update your profile and portfolio</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and public profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" placeholder="Enter your display name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell potential clients about yourself" className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet Address</Label>
              <Input id="wallet" value="0x1234...5678" disabled />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>Showcase your best work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Items</Label>
              <div className="grid gap-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">DeFi Dashboard</p>
                    <p className="text-sm text-muted-foreground">A comprehensive dashboard for DeFi protocols</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">NFT Marketplace</p>
                    <p className="text-sm text-muted-foreground">Custom NFT marketplace with auction functionality</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="outline">Add Portfolio Item</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}