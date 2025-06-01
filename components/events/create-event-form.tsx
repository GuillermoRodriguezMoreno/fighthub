"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Users, CalendarDays, Plus, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { UseGetMyClubsQuery } from "@/hooks/club/use-get-club-query"
import { ClubResponse } from "@/domains/club"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { EventRequest, NewEventInputs } from "@/domains/event"
import { useNewEventMutation } from "@/hooks/event/use-new-event-mutation"
import { EventDateTimePicker } from "./event-date-time-picker"
import { useSession } from "next-auth/react"

export type CreateEventFormProps = {
  clubs: ClubResponse[]
}

export default function CreateEventForm({ clubs }: CreateEventFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewEventInputs>()

  const { mutate: newEventMutate } = useNewEventMutation();

  const onSubmit: SubmitHandler<NewEventInputs> = async (data) => {
    const newEventRequest: EventRequest = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      organizer: {
        id: parseInt(data.organizer),
      },
    }
    newEventMutate(newEventRequest)
    reset()
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            Create New Event
          </CardTitle>
          <CardDescription>Fill in the information to create a new event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                placeholder="E.g.: National MMA Championship 2024"
                {...register("name", { required: "Event name is required" })}
              />
              {errors.name && <span className="text-destructive">{errors.name.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the event details, categories, rules, etc."
                rows={4}
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <span className="text-destructive">{errors.description.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                placeholder="E.g.: Municipal Sports Pavilion, Main Street 123, Madrid"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && <span className="text-destructive">{errors.address.message}</span>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <EventDateTimePicker control={control} fieldName={"startDate"} />
                {errors.startDate && <span className="text-destructive">{errors.startDate.message}</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>End Date</Label>
                <EventDateTimePicker control={control} fieldName={"endDate"} />
                {errors.startDate && <span className="text-destructive">{errors.startDate.message}</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Organizer Club
              </Label>
              <Controller
                name="organizer"
                control={control}
                rules={{ required: "Organizer club is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={String(club.id) || "-1"}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.organizer && <span className="text-destructive col-span-4">This field is required</span>}
            </div>
            <div className="grid grid-cols-4 gap-4 justify-end">
              <Button type="submit" className="col-start-4 col-span-1">
                <Plus />{"Create Event"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function CreateEventContainer() {
  const session = useSession();
const ownerEmail = session.data?.user?.email || "";

const myClubsQuery = UseGetMyClubsQuery(ownerEmail, !!ownerEmail,);

const isLoading = myClubsQuery.isLoading;

if (isLoading) {
  return <div>Loading...</div>;
}

if (!ownerEmail) {
  return <div>Please log in to create an event.</div>;
}

if (!myClubsQuery.data || myClubsQuery.data.length === 0) {
  return <div>No clubs found. Please create a club first.</div>;
}
  return (
    <CreateEventForm clubs={myClubsQuery.data} />
  )
}
