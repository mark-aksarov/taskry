"use client";

import { NavigationButton } from "@/components/common/NavigationButton";
import { Divider } from "@/components/ui";
import { CalendarCheck, Info, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProfileActions } from "../ProfileActions";

export function ProfileNavigationDesktop() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton
        isActive={pathname === "/profile/info" || pathname === "/profile"}
        variant="secondary"
        href="/profile"
      >
        <Info size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Profile Information
      </NavigationButton>
      <NavigationButton
        isActive={pathname === "/profile/tasks"}
        variant="secondary"
        href="/profile/tasks"
      >
        <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Assigned tasks
      </NavigationButton>
      <NavigationButton
        isActive={pathname === "/profile/notifications"}
        variant="secondary"
        href="/profile/notifications"
      >
        <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Notifications
      </NavigationButton>

      <Divider />

      <ProfileActions />
    </nav>
  );
}
