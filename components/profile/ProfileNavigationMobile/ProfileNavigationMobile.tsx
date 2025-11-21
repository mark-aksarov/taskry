"use client";

import { usePathname } from "next/navigation";
import { ProfileNavigationMobileLink } from "./ProfileNavigationMobileLink";

export function ProfileNavigationMobile() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 md:hidden">
      <ProfileNavigationMobileLink
        href="/profile"
        isSelected={pathname === "/profile"}
      >
        Info
      </ProfileNavigationMobileLink>

      <ProfileNavigationMobileLink
        href="/profile/tasks"
        isSelected={pathname === "/profile/tasks"}
      >
        Assigned tasks
      </ProfileNavigationMobileLink>
    </nav>
  );
}
