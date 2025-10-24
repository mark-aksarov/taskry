"use client";

import { DetailNavigation } from "@/components/common/DetailNavigation";
import { NavigationButton } from "@/components/common/NavigationButton";
import { Divider } from "@/components/ui";
import {
  CalendarCheck,
  ChevronRight,
  Info,
  KeyRound,
  Mail,
  Pencil,
  Trash,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function ProfileDetailNavigation() {
  const pathname = usePathname();

  const actionButtons = (
    <>
      <NavigationButton variant="secondary">
        <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Delete account
      </NavigationButton>
      <NavigationButton variant="secondary">
        <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Change password
      </NavigationButton>
      <NavigationButton variant="secondary">
        <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Edit account
      </NavigationButton>
    </>
  );

  return (
    <>
      <DetailNavigation className="max-md:hidden">
        <NavigationButton
          isActive={pathname === "/profile/info" || pathname === "/profile"}
          variant="secondary"
          href="/profile/info"
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

        {actionButtons}
      </DetailNavigation>

      <DetailNavigation className="md:hidden">
        <NavigationButton variant="secondary" href="/profile/info">
          <Info size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Profile Information
          <ChevronRight
            className="ml-auto"
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </NavigationButton>
        <NavigationButton variant="secondary" href="/profile/tasks">
          <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Assigned tasks
          <ChevronRight
            className="ml-auto"
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </NavigationButton>
        <NavigationButton variant="secondary" href="/profile/notifications">
          <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Notifications
          <ChevronRight
            className="ml-auto"
            size={18}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </NavigationButton>

        <Divider />

        {actionButtons}
      </DetailNavigation>
    </>
  );
}
