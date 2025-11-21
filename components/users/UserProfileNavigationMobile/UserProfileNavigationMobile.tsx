"use client";

import { useParams, usePathname } from "next/navigation";
import { ProfileNavigationMobileLink } from "@/components/profile/ProfileNavigationMobile";

export function UserProfileNavigationMobile() {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  return (
    <nav className="flex gap-1 md:hidden">
      <ProfileNavigationMobileLink
        href={`/team/${id}`}
        isSelected={pathname === `/team/${id}`}
      >
        Info
      </ProfileNavigationMobileLink>

      <ProfileNavigationMobileLink
        href={`/team/${id}/tasks`}
        isSelected={pathname === `/team/${id}/tasks`}
      >
        Assigned tasks
      </ProfileNavigationMobileLink>
    </nav>
  );
}
