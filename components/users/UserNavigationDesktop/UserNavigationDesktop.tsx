"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Divider } from "@/components/ui/Divider";
import { CalendarCheck, Info } from "lucide-react";
import { NavigationButton } from "@/components/common/NavigationButton";

interface UserNavigationDesktopProps {
  userActions?: React.ReactNode;
}

export function UserNavigationDesktop({
  userActions,
}: UserNavigationDesktopProps) {
  const t = useTranslations("users.UserNavigationDesktop");

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
        {t("userInformation")}
      </NavigationButton>

      <NavigationButton
        href={`/team/${id}/tasks`}
        isActive={pathname === `/team/${id}/tasks`}
        variant="secondary"
      >
        <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("assignedTasks")}
      </NavigationButton>

      {userActions && (
        <>
          <Divider />
          {userActions}
        </>
      )}
    </nav>
  );
}
