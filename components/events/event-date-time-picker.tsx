"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Control, Controller } from "react-hook-form";
import { NewEventInputs } from "@/domains/event";

export type EventDateTimePickerProps = {
  control: Control<NewEventInputs, any>; // 
  fieldName: "startDate" | "endDate";
};
export function EventDateTimePicker({
  control,
  fieldName,
}: EventDateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i).reverse();
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={undefined}
      rules={{
        required: "This date is required.",
      }}
      render={({ field }) => {
        const handleDateSelect = (selectedDate: Date | undefined) => {
          if (selectedDate) {
            const updatedDate = new Date(selectedDate);
            if (field.value) {
              updatedDate.setHours(field.value.getHours());
              updatedDate.setMinutes(field.value.getMinutes());
            }
            field.onChange(updatedDate); // Actualiza el valor en react-hook-form
          }
        };

        const handleTimeChange = (type: "hour" | "minute", value: string) => {
          if (field.value) {
            const updatedDate = new Date(field.value);
            if (type === "hour") {
              updatedDate.setHours(parseInt(value));
            } else if (type === "minute") {
              updatedDate.setMinutes(parseInt(value));
            }
            field.onChange(updatedDate); // Actualiza el valor en react-hook-form
          }
        };

        return (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "dd/MM/yyyy HH:mm")
                ) : (
                  <span>DD/MM/YYYY hh:mm</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="sm:flex">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={handleDateSelect}
                  initialFocus
                />
                <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {hours.reverse().map((hour) => (
                        <Button
                          key={hour}
                          size="icon"
                          variant={
                            field.value && field.value.getHours() === hour
                              ? "default"
                              : "ghost"
                          }
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() =>
                            handleTimeChange("hour", hour.toString())
                          }
                        >
                          {hour}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            key={minute}
                            size="icon"
                            variant={
                              field.value && field.value.getMinutes() === minute
                                ? "default"
                                : "ghost"
                            }
                            className="sm:w-full shrink-0 aspect-square"
                            onClick={() =>
                              handleTimeChange("minute", minute.toString())
                            }
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        ),
                      )}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
