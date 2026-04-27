import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AppButtonProps = React.ComponentProps<typeof Button> & {
  fullWidth?: boolean
}

function AppButton({ className, fullWidth = false, ...props }: AppButtonProps) {
  return (
    <Button
      className={cn(fullWidth && "w-full", className)}
      {...props}
    />
  )
}

export { AppButton }
