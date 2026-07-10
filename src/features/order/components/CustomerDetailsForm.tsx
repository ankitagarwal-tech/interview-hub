import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CustomerDetails } from "../types/order.types";
import type { CustomerDetailsErrors } from "../utils/validateCustomerDetails";

interface CustomerDetailsFormProps {
  values: CustomerDetails;
  errors: CustomerDetailsErrors;
  onChange: (field: keyof CustomerDetails, value: string) => void;
}

export function CustomerDetailsForm({
  values,
  errors,
  onChange,
}: CustomerDetailsFormProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          value={values.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          aria-invalid={!!errors.firstName}
        />
        {errors.firstName && (
          <p className="text-xs text-destructive">{errors.firstName}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          id="lastName"
          value={values.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          aria-invalid={!!errors.lastName}
        />
        {errors.lastName && (
          <p className="text-xs text-destructive">{errors.lastName}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="birthDate">Birth date</Label>
        <Input
          id="birthDate"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          //new date().setFullYear(2000)
          min={new Date(new Date().setFullYear(2000)  ).toISOString().split("T")[0]}
          value={values.birthDate}
          onChange={(e) => onChange("birthDate", e.target.value)}
          aria-invalid={!!errors.birthDate}
        />
        {errors.birthDate && (
          <p className="text-xs text-destructive">{errors.birthDate}</p>
        )}
      </div>
    </div>
  );
}
