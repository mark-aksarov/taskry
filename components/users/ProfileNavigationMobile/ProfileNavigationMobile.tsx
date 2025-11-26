"use client";

import { usePathname } from "@/i18n/navigation";
import { UserNavigationMobileLink } from "../UserNavigationMobile";

export function ProfileNavigationMobile() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 md:hidden">
      <UserNavigationMobileLink
        href="/profile"
        isSelected={pathname === "/profile"}
      >
        Info
      </UserNavigationMobileLink>

      <UserNavigationMobileLink
        href="/profile/tasks"
        isSelected={pathname === "/profile/tasks"}
      >
        Assigned tasks
      </UserNavigationMobileLink>
    </nav>
  );
}
