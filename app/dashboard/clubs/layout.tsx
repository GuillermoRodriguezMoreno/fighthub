"use client";
import { MainHeader } from "@/components/core/main-header";
import { path } from "@/config/path";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader
        title={"Clubs"}
        buttonContent={"Club"}
        link={path.dashboard.clubs.new}
      />
      {children}
    </div>
  );
}
