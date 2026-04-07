import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CartSummaryCheckoutStepProps {
  name: string;
  email: string;
  birthDate: string;
  formError: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onBirthDateChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

export default function CartSummaryCheckoutStep({
  name,
  email,
  birthDate,
  formError,
  onNameChange,
  onEmailChange,
  onBirthDateChange,
  onSubmit,
  onBack,
}: CartSummaryCheckoutStepProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          autoComplete="name"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          autoComplete="email"
        />
        <Input
          type="date"
          value={birthDate}
          onChange={(e) => onBirthDateChange(e.target.value)}
          className="sm:col-span-2"
        />
      </div>
      {formError && (
        <p className="text-sm text-destructive" role="alert">
          {formError}
        </p>
      )}
      <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Submit order</Button>
      </DialogFooter>
    </form>
  );
}
