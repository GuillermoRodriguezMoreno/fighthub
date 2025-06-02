"use client";
import { MainHeader } from "@/components/core/main-header";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader title={"Admin"} />
      {children}
    </div>
  );
}
