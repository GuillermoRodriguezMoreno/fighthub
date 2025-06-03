"use client";
import { NewElementHeader } from "@/components/core/new-element-header";
import { path } from "@/config/path";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NewElementHeader
        title={"Clubs"}
        buttonContent={"Club"}
        link={path.dashboard.clubs.new}
      />
      {children}
    </div>
  );
}
