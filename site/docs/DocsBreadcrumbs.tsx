"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Breadcrumb, Breadcrumbs } from "@/ui/Breadcrumbs";

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("site.docs.DocsNavigation");

  const items = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);

    if (parts[0] !== "docs") return [];

    const [, section, page] = parts;

    const result: { label: string; href: string }[] = [];

    result.push({
      label: t("breadcrumbs"),
      href: "/docs",
    });

    const sectionMap: Record<string, string> = {
      "getting-started": t("gettingStarted.heading"),
      projects: t("projects.heading"),
      tasks: t("tasks.heading"),
      team: t("team.heading"),
      customers: t("customers.heading"),
    };

    if (section) {
      result.push({
        label: sectionMap[section] ?? section,
        href: `/docs/${section}`,
      });
    }

    const pageMap: Record<string, Record<string, string>> = {
      "getting-started": {
        overview: t("gettingStarted.overview"),
      },
      projects: {
        "view-mode": t("projects.viewMode"),
        create: t("projects.create"),
        edit: t("projects.edit"),
        delete: t("projects.delete"),
        "status-change": t("projects.statusChange"),
        filters: t("projects.filters"),
        sorting: t("projects.sorting"),
        categories: t("projects.categories"),
      },
      tasks: {
        "view-mode": t("tasks.viewMode"),
        create: t("tasks.create"),
        edit: t("tasks.edit"),
        delete: t("tasks.delete"),
        "status-change": t("tasks.statusChange"),
        filters: t("tasks.filters"),
        sorting: t("tasks.sorting"),
        categories: t("tasks.categories"),
      },
      team: {
        roles: t("team.roles"),
        "view-mode": t("team.viewMode"),
        create: t("team.create"),
        edit: t("team.edit"),
        "avatar-change": t("team.avatarChange"),
        delete: t("team.delete"),
        positions: t("team.positions"),
      },
      customers: {
        "view-mode": t("customers.viewMode"),
        create: t("customers.create"),
        edit: t("customers.edit"),
        delete: t("customers.delete"),
        companies: t("customers.companies"),
      },
    };

    if (section && page) {
      result.push({
        label: pageMap[section]?.[page] ?? page,
        href: `/docs/${section}/${page}`,
      });
    }

    return result;
  }, [pathname, t]);

  return (
    <Breadcrumbs className="max-w-[calc(100vw-2rem)] max-md:mb-6 md:mb-8">
      {items.map((item, i) => (
        <Breadcrumb
          key={item.href}
          href={i === items.length - 1 ? undefined : item.href}
        >
          {item.label}
        </Breadcrumb>
      ))}
    </Breadcrumbs>
  );
}
