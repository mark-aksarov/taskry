"use client";

import { Divider } from "@/components/ui";
import { usePathname } from "next/navigation";
import { CalendarCheck, Info } from "lucide-react";
import { ProfileActions } from "../ProfileActions";
import { NavigationButton } from "@/components/common/NavigationButton";

export function ProfileNavigationDesktop() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton
        href="/profile"
        isActive={pathname === "/profile"}
        variant="secondary"
      >
        <Info size={18} strokeWidth={1.5} absoluteStrokeWidth />
        User Information
      </NavigationButton>
      <NavigationButton
        href="/profile/tasks"
        isActive={pathname === "/profile/tasks"}
        variant="secondary"
      >
        <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Assigned tasks
      </NavigationButton>

      <Divider />

      <ProfileActions />
    </nav>
  );
}
