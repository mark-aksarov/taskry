"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { CalendarCheck, Info } from "lucide-react";
import { Separator } from "@/ui/Separator";
import { NavigationButton } from "@/dashboard/common/NavigationButton";

interface UserNavigationLargeProps {
  userActions: React.ReactNode;
}

export function UserNavigationLarge({ userActions }: UserNavigationLargeProps) {
  const t = useTranslations("dashboard.users.UserNavigationLarge");

  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton
        href={`/team/${id}`}
        isActive={pathname === `/team/${id}`}
        variant="secondary"
        iconLeft={<Info size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={t("userInformation")}
      />

      <NavigationButton
        href={`/team/${id}/tasks`}
        isActive={pathname === `/team/${id}/tasks`}
        variant="secondary"
        iconLeft={
          <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        label={t("assignedTasks")}
      />

      {userActions && (
        <>
          <Separator />
          {userActions}
        </>
      )}
    </nav>
  );
}
