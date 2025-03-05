import { CalendarSearch, Home, Dumbbell, BicepsFlexed, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import Image from "next/image"
import { ModeToggle } from "./mode-toggle"
import { ModeSwitch } from "./mode-switch"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Fighters",
    url: "/dashboard/fighters",
    icon: BicepsFlexed,
  },
  {
    title: "Clubs",
    url: "/dashboard/clubs",
    icon: Dumbbell,
  },
  {
    title: "Events",
    url: "/dashboard/events",
    icon: CalendarSearch,
  },
  {
    title: "Admin",
    url: "/dashboard/admin",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Image src="/logo.png" alt="logo image"  width={80} height={80}  />
        <h1 className="text-xl font-bold">FightHub</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <ModeSwitch />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
