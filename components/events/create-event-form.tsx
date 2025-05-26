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

export type CreateEventFormProps = {
  clubs: ClubResponse[]
}

export default function CreateEventForm({ clubs }: CreateEventFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Aquí harías la llamada a tu API
      //   const eventRequest = {
      //     id: formData.id,
      //     name: formData.name,
      //     description: formData.description,
      //     address: formData.address,
      //     startDate: formData.startDate?.toISOString().split("T")[0],
      //     endDate: formData.endDate?.toISOString().split("T")[0],
      //     organizer: formData.organizer,
      //   }


    } catch (error) {
      console.error("Error al crear evento:", error)
      alert("Error al crear el evento")
    }
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                placeholder="E.g.: National MMA Championship 2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the event details, categories, rules, etc."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                placeholder="E.g.: Municipal Sports Pavilion, Main Street 123, Madrid"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {<span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"

                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {<span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Organizer Club
              </Label>
              <Select
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the organizer club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={String(club.id)}>
                      {club.name}
                    </SelectItem>
                  ))}
                  {/* {clubs.map((club) => (
                    <SelectItem key={club?.id} value={club.id ? String(club.id) : ""} >
                      {club.name}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
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
  const myClubsQuery = UseGetMyClubsQuery(1) // Replace with actual owner ID

  const isLoading = myClubsQuery.isLoading

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!myClubsQuery.data || myClubsQuery.data.length === 0) {
    return <div>No clubs found. Please create a club first.</div>
  }
  return (
      <CreateEventForm clubs={myClubsQuery.data} />
  )
}
