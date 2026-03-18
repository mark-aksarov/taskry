"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { CalendarCheck, Info } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import { NavigationButton } from "@/components/common/NavigationButton";

interface ProfileNavigationLargeProps {
  profileActions: React.ReactNode;
}

export function ProfileNavigationLarge({
  profileActions,
}: ProfileNavigationLargeProps) {
  const t = useTranslations("users.ProfileNavigationLarge");
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton
        href="/profile"
        isActive={pathname === "/profile"}
        variant="secondary"
        iconLeft={<Info size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={t("userInformation")}
      />

      <NavigationButton
        href="/profile/tasks"
        isActive={pathname === "/profile/tasks"}
        variant="secondary"
        iconLeft={
          <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        label={t("assignedTasks")}
      />

      {profileActions && (
        <>
          <Separator />
          {profileActions}
        </>
      )}
    </nav>
  );
}
