import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ProfilePhotos() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Photos</h2>
      <Card>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative aspect-w-1 aspect-h-1">
              <img
                src="/profile-photo.jpeg"
                alt="Photo 1"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative aspect-w-1 aspect-h-1">
              <img
                src="/profile-photo2.webp"
                alt="Photo 2"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative aspect-w-1 aspect-h-1">
              <img
                src="/fight1.webp"
                alt="Photo 3"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

