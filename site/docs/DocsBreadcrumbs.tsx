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
      projects: t("projects.heading"),
      tasks: t("tasks.heading"),
      team: t("team.heading"),
      clients: t("clients.heading"),
    };

    if (section) {
      result.push({
        label: sectionMap[section] ?? section,
        href: `/docs/${section}`,
      });
    }

    const pageMap: Record<string, Record<string, string>> = {
      projects: {
        view: t("projects.view"),
        actions: t("projects.actions"),
        "import-export": t("projects.importExport"),
        search: t("projects.search"),
        categories: t("projects.categories"),
      },
      tasks: {
        view: t("tasks.view"),
        actions: t("tasks.actions"),
        "import-export": t("tasks.importExport"),
        search: t("tasks.search"),
        subtasks: t("tasks.subtasks"),
        categories: t("tasks.categories"),
      },
      team: {
        roles: t("team.roles"),
        view: t("team.view"),
        actions: t("team.actions"),
        "import-export": t("team.importExport"),
        search: t("team.search"),
        positions: t("team.positions"),
      },
      clients: {
        view: t("clients.view"),
        actions: t("clients.actions"),
        "import-export": t("clients.importExport"),
        search: t("clients.search"),
        companies: t("clients.companies"),
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
