"use client";
import { NewElementHeader } from "@/components/core/new-element-header";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NewElementHeader title={"Admin"} />
      {children}
    </div>
  );
}
