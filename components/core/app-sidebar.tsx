import {
  CalendarSearch,
  Home,
  Dumbbell,
  BicepsFlexed,
  Settings,
  Trophy,
  Bot,
} from "lucide-react";
import { path as appPath } from "@/config/path";
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
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { path } from "@/config/path";
import { Badge } from "../ui/badge";
import { Tooltip } from "../ui/tooltip";

const routes = [
  {
    title: "Home",
    url: path.dashboard.base,
    icon: Home,
  },
  {
    title: "Events",
    url: path.dashboard.events.all,
    icon: CalendarSearch,
    items: [
      {
        title: "All",
        url: path.dashboard.events.all,
      },
      {
        title: "My Events",
        url: path.dashboard.events.myEvents,
      },
    ],
  },
  {
    title: "Fights",
    url: path.dashboard.fights.all,
    icon: Trophy,
    items: [
      {
        title: "All",
        url: path.dashboard.fights.all,
      },
      {
        title: "My Fights",
        url: path.dashboard.fights.myFights,
      },
    ],
  },
  {
    title: "Fighters",
    url: path.dashboard.fighters.all,
    icon: BicepsFlexed,
    items: [
      {
        title: "All",
        url: path.dashboard.fighters.all,
      },
      {
        title: "My Fighters",
        url: path.dashboard.fighters.myFighters,
      },
    ],
  },
  {
    title: "Clubs",
    url: path.dashboard.clubs.all,
    icon: Dumbbell,
    items: [
      {
        title: "All",
        url: path.dashboard.clubs.all,
      },
      {
        title: "My Club",
        url: path.dashboard.clubs.myClubs,
      },
    ],
  },
  {
    title: "Admin",
    url: path.dashboard.admin,
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={appPath.dashboard.fighterMatcher.base}>
                    <Bot />
                    <span>Fighter Matcher</span>
                    <Badge className="ml-2">AI</Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
