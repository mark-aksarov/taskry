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
  } else if (pathname === "/profile" || pathname === "/profile/tasks") {
    title = "Profile Settings";
  } else if (pathname.match("/tasks/[0-9]+")) {
    title = "Task Details";
  } else if (
    pathname?.startsWith("/team/") &&
    (pathname.split("/").length === 3 || pathname.endsWith("/tasks"))
  ) {
    title = "User Information";
  }

  return <h2 className="text-xl font-extrabold">{title}</h2>;
}
