"use client";

import { usePathname } from "next/navigation";

export function AppHeaderTitle() {
  const pathname = usePathname();

  let title = "Dashboard";

  if (pathname.startsWith("/projects")) {
    title = "All Projects";
  } else if (pathname.startsWith("/tasks")) {
    title = "All Tasks";
  } else if (pathname.startsWith("/team")) {
    title = "Team";
  } else if (pathname.startsWith("/customers")) {
    title = "All Customers";
  } else if (pathname.startsWith("/profile")) {
    title = "Profile Settings";
  }

  return <h2 className="text-xl font-bold">{title}</h2>;
}
