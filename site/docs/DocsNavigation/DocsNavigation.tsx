"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { DocsNavigationLink } from "./DocsNavigationLink";

export function DocsNavigation() {
  const pathname = usePathname();
  const t = useTranslations("site.docs.DocsNavigation");

  return (
    <nav className="flex flex-col gap-4">
      <DocsNavigationLink
        href="/docs/getting-started"
        isActive={pathname === "/docs/getting-started"}
      >
        {t("gettingStarted")}
      </DocsNavigationLink>

      <DocsNavigationLink
        href="/docs/projects"
        isActive={pathname === "/docs/projects"}
      >
        {t("projects")}
      </DocsNavigationLink>

      <DocsNavigationLink
        href="/docs/tasks"
        isActive={pathname === "/docs/tasks"}
      >
        {t("tasks")}
      </DocsNavigationLink>

      <DocsNavigationLink
        href="/docs/categories"
        isActive={pathname === "/docs/categories"}
      >
        {t("categories")}
      </DocsNavigationLink>

      <DocsNavigationLink
        href="/docs/comments"
        isActive={pathname === "/docs/comments"}
      >
        {t("comments")}
      </DocsNavigationLink>

      <DocsNavigationLink
        href="/docs/users"
        isActive={pathname === "/docs/users"}
      >
        {t("users")}
      </DocsNavigationLink>

      <DocsNavigationLink
        href="/docs/search"
        isActive={pathname === "/docs/search"}
      >
        {t("search")}
      </DocsNavigationLink>

      <DocsNavigationLink
        href="/docs/clients"
        isActive={pathname === "/docs/clients"}
      >
        {t("clients")}
      </DocsNavigationLink>
    </nav>
  );
}
