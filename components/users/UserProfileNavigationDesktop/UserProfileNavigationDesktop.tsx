"use client";

import { CalendarCheck, Info } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { NavigationButton } from "@/components/common/NavigationButton";

export function UserProfileNavigationDesktop() {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton
        href={`/team/${id}`}
        isActive={pathname === `/team/${id}`}
        variant="secondary"
      >
        <Info size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Profile Information
      </NavigationButton>

      <NavigationButton
        href={`/team/${id}/tasks`}
        isActive={pathname === `/team/${id}/tasks`}
        variant="secondary"
      >
        <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Assigned tasks
      </NavigationButton>
    </nav>
  );
}
