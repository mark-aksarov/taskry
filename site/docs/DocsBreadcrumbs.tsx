"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Breadcrumb, Breadcrumbs } from "@/ui/Breadcrumbs";

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("site.docs.DocsBreadcrumbs");

  let second: string | null = null;

  if (pathname === "/docs/getting-started") {
    second = t("gettingStarted");
  } else if (pathname === "/docs/projects") {
    second = t("projects");
  } else if (pathname === "/docs/tasks") {
    second = t("tasks");
  } else if (pathname === "/docs/categories") {
    second = t("categories");
  } else if (pathname === "/docs/comments") {
    second = t("comments");
  } else if (pathname === "/docs/users") {
    second = t("users");
  } else if (pathname === "/docs/search") {
    second = t("search");
  } else if (pathname === "/docs/clients") {
    second = t("clients");
  }

  return (
    <Breadcrumbs>
      <Breadcrumb>{t("docs")}</Breadcrumb>
      {second && <Breadcrumb>{second}</Breadcrumb>}
    </Breadcrumbs>
  );
}
