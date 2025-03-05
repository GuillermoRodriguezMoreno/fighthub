'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export function AccountForm() {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <p className="mb-6">Update your account settings. Set your preferred language and timezone.</p>
            <Separator className="my-4" />
            <div className="flex flex-col items-start gap-7">
                <div className="flex flex-col gap-4 items-start">
                    <Label htmlFor="fistname">Firstname</Label>
                    <Input id="firstname" placeholder="Your name" />
                    <p className="text-sm text-gray-500">This is the name that will be displayed on your profile and in emails.</p>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <Label htmlFor="lastname">Lastname</Label>
                    <Input id="lastname" placeholder="Your name" />
                    <p className="text-sm text-gray-500">This is the lastname that will be displayed on your profile and in emails.</p>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <Label>Date of birth</Label>
                    <div className="flex gap-2">
                    <Input id="dateofbirth" placeholder="Date of birth" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"ghost"}
                            >
                                <CalendarIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center"  side="bottom">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(day) => day && setDate(day)}                               
                            />
                        </PopoverContent>
                    </Popover>
                    </div>
                    <p className="text-sm text-gray-500">Your date of birth is used to calculate your age.</p>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <Label>Gender</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">This is the gender that will be displayed on your profile.</p>
                </div>

                <Button>Update account</Button>
            </div>
        </div>
    );
}
