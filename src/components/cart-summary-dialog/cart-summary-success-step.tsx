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
        <DialogTitle>Thank you</DialogTitle>
        <DialogDescription className="text-base text-foreground">
          Your order was placed successfully.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-center">
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </>
  );
}
