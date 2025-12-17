import { DateSelector } from "./DateSelector";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface UserInfoFormsProps {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date | undefined;
  onChangeUserForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDob: (date: Date | undefined) => void;
}

export const UserInfoForms = (props: UserInfoFormsProps) => {
  const { firstName, lastName, email, dob, onChangeUserForm, onChangeDob } =
    props;

  return (
    <div>
      <Label className="mt-4 mb-2 font-semibold">First Name</Label>
      <Input
        type="text"
        placeholder="Enter your first name"
        value={firstName}
        name="firstName"
        onChange={onChangeUserForm}
      />

      <Label className="mt-4 mb-2 font-semibold">Last Name</Label>
      <Input
        type="text"
        placeholder="Enter your last name"
        value={lastName}
        name="lastName"
        onChange={onChangeUserForm}
      />

      <Label className="mt-4 mb-2 font-semibold">Email</Label>
      <Input
        type="email"
        placeholder="Enter your email address"
        value={email}
        name="email"
        onChange={onChangeUserForm}
      />

      <Label className="mt-4 mb-2 font-semibold">DOB</Label>
      <DateSelector date={dob} setDate={onChangeDob} />
    </div>
  );
};
