"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export function AppHeaderTitle() {
  const pathname = usePathname();
  const t = useTranslations("layout.AppHeader.title");

  let title = t("dashboard");

  if (pathname === "/projects") {
    title = t("projects");
  } else if (pathname === "/tasks") {
    title = t("tasks");
  } else if (pathname === "/team") {
    title = t("team");
  } else if (pathname === "/customers") {
    title = t("customers");
  } else if (pathname === "/profile" || pathname === "/profile/tasks") {
    title = t("profileSettings");
  } else if (pathname.match("/tasks/[0-9]+")) {
    title = t("taskDetails");
  } else if (pathname.match("/projects/[0-9]+")) {
    title = t("projectDetails");
  } else if (
    pathname?.startsWith("/team/") &&
    (pathname.split("/").length === 3 || pathname.endsWith("/tasks"))
  ) {
    title = t("userInfo");
  }

  return <h2 className="text-xl font-extrabold">{title}</h2>;
}
