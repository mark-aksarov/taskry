"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { CalendarCheck, Info } from "lucide-react";
import { ProfileActions } from "../ProfileActions";
import { Separator } from "@/components/ui/Separator";
import { NavigationButton } from "@/components/common/NavigationButton";

interface ProfileNavigationDesktopProps {
  userId: string;
  userFullName: string;
}

export function ProfileNavigationDesktop({
  userId,
  userFullName,
}: ProfileNavigationDesktopProps) {
  const t = useTranslations("users.ProfileNavigationDesktop");
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

      <Separator />
      <ProfileActions userId={userId} userFullName={userFullName} />
    </nav>
  );
}
