import {
  CalendarSearch,
  Home,
  Dumbbell,
  BicepsFlexed,
  Settings,
  Trophy,
} from "lucide-react";

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Image from "next/image";
import { ModeSwitch } from "./mode-switch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const routes = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Events",
    url: "/dashboard/events/all",
    icon: CalendarSearch,
    items: [
      {
        title: "All",
        url: "/dashboard/events/all",
      },
      {
        title: "My Events",
        url: "/dashboard/events/my-events",
      },
    ],
  },
  {
    title: "Fights",
    url: "/dashboard/fights",
    icon: Trophy,
    items: [
      {
        title: "Popular",
        url: "/dashboard/fights/popular",
      },
      {
        title: "My Fights",
        url: "/dashboard/fights/my-fights",
      },
    ],
  },
  {
    title: "Fighters",
    url: "/dashboard/fighters",
    icon: BicepsFlexed,
    items: [
      {
        title: "Popular",
        url: "/dashboard/fighters/popular",
      },
      {
        title: "Nearest Fighters",
        url: "/dashboard/fighters/nearest",
      },
      {
        title: "All",
        url: "/dashboard/fighters/all",
      },
    ],
  },
  {
    title: "Clubs",
    url: "/dashboard/clubs",
    icon: Dumbbell,
    items: [
      {
        title: "Popular",
        url: "/dashboard/clubs/popular",
      },
      {
        title: "All",
        url: "/dashboard/clubs/all",
      },
      {
        title: "My Club",
        url: "/dashboard/clubs/my-club",
      },
    ],
  },
  {
    title: "Admin",
    url: "/dashboard/admin",
    icon: Settings,
    protected: true,
  },
];

export function AppSidebar() {
  const roles = useSession().data?.roles;
  const adminRole = "ROLE_ADMIN";
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="gap-2">
        <Image
          src="/login-image.jpg"
          alt="logo image"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h1 className="text-xl font-bold">FightHub</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes
                .filter((item) => roles?.includes(adminRole) || !item.protected)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={path === item.url}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
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
  );
}
