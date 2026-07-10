import type { CustomerDetails } from "../types/order.types";

export type CustomerDetailsErrors = Partial<Record<keyof CustomerDetails, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCustomerDetails(
  details: CustomerDetails
): CustomerDetailsErrors {
  const errors: CustomerDetailsErrors = {};

  if (!details.firstName.trim()) errors.firstName = "First name is required";
  if (!details.lastName.trim()) errors.lastName = "Last name is required";

  if (!details.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(details.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!details.birthDate) {
    errors.birthDate = "Birth date is required";
  } else if (new Date(details.birthDate) > new Date()) {
    errors.birthDate = "Birth date cannot be in the future";
  }

  return errors;
}
