import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type AppInputFieldProps = React.ComponentProps<typeof Input> & {
  id: string
  label: string
}

function AppInputField({ id, label, className, ...props }: AppInputFieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground/90">
        {label}
      </label>
      <Input id={id} className={cn("bg-background", className)} {...props} />
    </div>
  )
}

export { AppInputField }
