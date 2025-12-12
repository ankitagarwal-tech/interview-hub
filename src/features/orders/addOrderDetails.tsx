import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

type UserDetails = {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
};

type AddOrderDetailsProps = {
    userDetails: UserDetails;
    handleUserDetailChange: (field: keyof UserDetails, value: string | Date) => void;
};

const AddOrderDetails = ({ userDetails, handleUserDetailChange }: AddOrderDetailsProps) => {
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <div className="p-2 rounded mt-4">
            <div className="mb-2 text-lg font-semibold text-blue-900">Customer Information</div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="first-name-1" className="text-sm font-medium">First Name</Label>
                    <Input
                        id="first-name-1"
                        name="firstName"
                        value={userDetails.firstName}
                        onChange={e => handleUserDetailChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        className="focus:ring-2 focus:ring-blue-400 transition-all"
                        autoComplete="given-name"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="last-name-1" className="text-sm font-medium">Last Name</Label>
                    <Input
                        id="last-name-1"
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={e => handleUserDetailChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                        className="focus:ring-2 focus:ring-blue-400 transition-all"
                        autoComplete="family-name"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email-1" className="text-sm font-medium">Email ID</Label>
                    <Input
                        id="email-1"
                        name="email"
                        value={userDetails.email}
                        onChange={e => handleUserDetailChange("email", e.target.value)}
                        placeholder="Enter email"
                        className="focus:ring-2 focus:ring-blue-400 transition-all"
                        type="email"
                        autoComplete="email"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="birthDate" className="text-sm font-medium">Birth Date</Label>
                    <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                        <PopoverTrigger asChild>
                            <button
                                type="button"
                                className={cn(
                                    "flex items-center gap-2 px-2 py-1 rounded bg-white border border-gray-300 hover:bg-blue-50 transition-colors w-full text-left",
                                    "focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-200"
                                )}
                                onClick={() => setShowCalendar(true)}
                            >
                                <span>
                                    {userDetails.birthDate
                                        ? userDetails.birthDate.toDateString()
                                        : "Select birth date"}
                                </span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={userDetails.birthDate}
                                onSelect={date => {
                                    if (date) {
                                        handleUserDetailChange("birthDate", date);
                                        setShowCalendar(false);
                                    }
                                }}
                                className="rounded-lg border"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default AddOrderDetails;