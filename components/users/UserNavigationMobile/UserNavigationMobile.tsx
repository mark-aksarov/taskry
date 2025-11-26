"use client";

import { useParams } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { UserNavigationMobileLink } from "./UserNavigationMobileLink";

export function UserNavigationMobile() {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  return (
    <nav className="flex gap-1 md:hidden">
      <UserNavigationMobileLink
        href={`/team/${id}`}
        isSelected={pathname === `/team/${id}`}
      >
        Info
      </UserNavigationMobileLink>

      <UserNavigationMobileLink
        href={`/team/${id}/tasks`}
        isSelected={pathname === `/team/${id}/tasks`}
      >
        Assigned tasks
      </UserNavigationMobileLink>
    </nav>
  );
}
