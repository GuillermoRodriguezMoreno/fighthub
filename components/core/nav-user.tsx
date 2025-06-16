"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  SquareUser,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { path } from "@/config/path";
import { UseGetFighterProfileQuery } from "@/hooks/fighter_profile/use-get-fighter-profile-query";

export function NavUser() {
  const { isMobile } = useSidebar();
  const session = useSession();
  const userId = session.data?.userId || -1;
  const enabled = !!userId && userId > 0;
  const router = useRouter();
  const profileQuery = UseGetFighterProfileQuery(userId, enabled);

  if (profileQuery.isLoading) {
    return null; // or a loading spinner
  }
  if (profileQuery.isError) {
    return null; // or an error message
  }
  if (!profileQuery.data) {
    return null; // or a message indicating no profile found
  }
  const fighterProfile = profileQuery.data;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={fighterProfile.profilePicture} alt="user name" />
                <AvatarFallback className="rounded-lg">N/A</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{fighterProfile.name}</span>
                <span className="truncate text-xs">{fighterProfile.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={fighterProfile.profilePicture} alt="user picture" />
                  <AvatarFallback className="rounded-lg">N/A</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{fighterProfile.name}</span>
                  <span className="truncate text-xs">{fighterProfile.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`${path.dashboard.fighters.base}/${userId}`)
                }
              >
                <SquareUser />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
