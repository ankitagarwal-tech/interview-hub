import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "./ui/calendar";

interface DateSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const DateSelector = (props: DateSelectorProps) => {
  const [open, setOpen] = useState(false);
  const { date, setDate } = props;

  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 16);

  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 16);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            disabled={{ after: maxDob }}
            defaultMonth={defaultDate}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
