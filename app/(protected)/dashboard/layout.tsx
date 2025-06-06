"use client";
import { AppSidebar } from "@/components/core/app-sidebar";
import { Separator } from "@/components/ui/separator";
import DinamycBreadcrumb from "@/components/core/dynamic-breadcrum";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DinamycBreadcrumb />
        </header>
        <main className="grid grid-cols-1 gap-10 p-6 sm:p-18">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
