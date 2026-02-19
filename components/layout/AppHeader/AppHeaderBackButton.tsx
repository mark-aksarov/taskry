"use client";

import { usePathname } from "@/i18n/navigation";
import { BackButton } from "@/components/common/BackButton";

export function AppHeaderBackButton() {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/projects" ||
    pathname === "/tasks" ||
    pathname === "/team" ||
    pathname === "/customers" ||
    pathname === "/profile"
  ) {
    return null;
  }

  return <BackButton />;
}
