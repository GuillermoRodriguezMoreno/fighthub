"use client";
import { EditElementHeader } from "@/components/core/edit-element-header";
import { NewElementHeader } from "@/components/core/new-element-header";
import { path } from "@/config/path";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <EditElementHeader
        title={"Event"}
        buttonContent={"Event"}
        link={path.dashboard.events.new}
      />
      {children}
    </div>
  );
}
