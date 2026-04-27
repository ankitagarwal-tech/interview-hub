import * as React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function AppCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn("overflow-hidden border-border/70 shadow-sm", className)}
      {...props}
    />
  )
}

export { AppCard }
