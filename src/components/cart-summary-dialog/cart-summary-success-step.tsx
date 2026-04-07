import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CartSummarySuccessStepProps {
  onClose: () => void;
}

export default function CartSummarySuccessStep({
  onClose,
}: CartSummarySuccessStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">
          Order Successfully Placed
        </DialogTitle>
        <DialogDescription className="my-6 text-base font-semibold text-green-700/80 text-center">
          Thank you for your order. We will contact you soon.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-center">
        <Button className="cursor-pointer" type="button" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </>
  );
}
