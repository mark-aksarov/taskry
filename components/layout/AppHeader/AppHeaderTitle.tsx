"use client";

import { usePathname } from "next/navigation";

export function AppHeaderTitle() {
  const pathname = usePathname();

  let title = "Dashboard";

  if (pathname === "/projects") {
    title = "All Projects";
  } else if (pathname === "/tasks") {
    title = "All Tasks";
  } else if (pathname === "/team") {
    title = "Team";
  } else if (pathname === "/customers") {
    title = "All Customers";
  } else if (pathname === "/profile") {
    title = "Profile Settings";
  } else if (pathname.match("/tasks/[0-9]+")) {
    title = "Task Details";
  }

  return <h2 className="text-xl font-extrabold">{title}</h2>;
}
