import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
interface CustomDialogProps {
  title: string;
  handleSubmit: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  width?: string; // <-- Add width prop
  confirmDialogTitle?: string;
}

const CustomDialog = ({ title, handleSubmit, children, disabled, width, confirmDialogTitle }: CustomDialogProps) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={disabled} className={'bg-[#394551] text-white'}>Place Order</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" style={width ? { maxWidth: width } : undefined}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {children}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>{confirmDialogTitle}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
export default CustomDialog