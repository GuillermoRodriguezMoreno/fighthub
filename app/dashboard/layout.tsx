'use client'
import { AppSidebar } from "@/components/core/app-sidebar"

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
  );
}
