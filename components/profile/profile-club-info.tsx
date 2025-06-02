import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ProfileClubInfo() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Club</h2>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src="/nextgen.jpeg" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Nextgen Fight Club</CardTitle>
            <CardDescription>Mijas</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>nextgen@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Las lagunas, Mijas, Malaga</span>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-medium mb-2">Classes</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Kick boxing</Badge>
              <Badge variant="secondary">MMA</Badge>
              <Badge variant="secondary">BJJ</Badge>
              <Badge variant="secondary">Boxing</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>View Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
