import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

function AppToaster() {
  return <Toaster richColors position="top-right" />
}

function showOrderPlacedToast() {
  toast.success("Order placed successfully")
}

export { AppToaster, showOrderPlacedToast }
