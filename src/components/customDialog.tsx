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
}

const  CustomDialog=({title, handleSubmit, children,disabled}: CustomDialogProps) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={disabled}>Place Order</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
            <Button type="submit" onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
export default CustomDialog