import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface JobDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  job: {
    title: string
    client: string
    budget: string
    dueDate?: string
    completedDate?: string
    status: 'active' | 'completed'
    description: string
    requirements: string[]
    benefits: string[]
  }
}

export function JobDetailsDialog({ isOpen, onClose, job }: JobDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden p-6">
        <DialogHeader className="space-y-3 pr-8">
          <DialogTitle className="text-2xl font-semibold">{job.title}</DialogTitle>
          <div className="flex items-center gap-2">
            <DialogDescription className="text-base">
              {job.status === 'active' 
                ? `Due in ${job.dueDate}`
                : `Completed on ${job.completedDate}`
              }
            </DialogDescription>
            <Badge 
              variant={job.status === 'active' ? "default" : "secondary"}
            >
              {job.status === 'active' ? 'Active' : 'Completed'}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="mt-6 pr-6 max-h-[50vh]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Client Details</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground">{job.client}</p>
                <p className="text-muted-foreground">Budget: {job.budget}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="text-lg font-semibold mb-3">Project Description</h3>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-muted-foreground">{req}</li>
                ))}
              </ul>
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="text-lg font-semibold mb-3">What You'll Get</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="text-muted-foreground">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end mt-8 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 