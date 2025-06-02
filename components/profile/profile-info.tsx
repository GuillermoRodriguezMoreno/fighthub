import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfileMasonry from "./profile-masonry";

export default function ProfileInfo() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6 xl:gap-10">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <img
              src="/profile-photo2.webp"
              width="96"
              height="96"
              alt="Avatar"
              className="rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Wadii Kadiri</h1>
            <p className="text-gray-500 dark:text-gray-400">Pro fighter</p>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Passionate about fighting.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Info</h2>
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value="Wadii Kadiri" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Enter your bio"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </div>
      <ProfileMasonry />
    </div>
  );
}
