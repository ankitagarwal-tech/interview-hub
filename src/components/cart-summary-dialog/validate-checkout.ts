const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCheckoutForm(
  name: string,
  email: string,
  birthDate: string,
): string | null {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return "Please enter your name.";
  }

  const trimmedEmail = email.trim();
  if (!emailPattern.test(trimmedEmail)) {
    return "Please enter a valid email address.";
  }

  const parsedBirthDate = new Date(birthDate);
  const now = new Date();
  if (!birthDate || Number.isNaN(parsedBirthDate.getTime())) {
    return "Please enter your date of birth.";
  }
  if (parsedBirthDate > now) {
    return "Birth date cannot be in the future.";
  }

  return null;
}
