"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { DocsPaginationLink } from "./DocsPaginationLink";

export function DocsPagination() {
  const pathname = usePathname();
  const t = useTranslations("site.docs.DocsNavigation");

  const pagination = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);

    if (parts[0] !== "docs") return null;

    const [, section, page] = parts;
    if (!section) return null;

    const pagesMap: Record<string, { slug: string; label: string }[]> = {
      "getting-started": [
        { slug: "", label: t("gettingStarted.heading") },
        { slug: "overview", label: t("gettingStarted.overview") },
      ],

      general: [
        { slug: "", label: t("general.heading") },
        { slug: "sign-up", label: t("general.signUp") },
        { slug: "sign-in", label: t("general.signIn") },
        { slug: "search", label: t("general.search") },
        { slug: "lang-theme", label: t("general.langTheme") },
      ],

      projects: [
        { slug: "", label: t("projects.heading") },
        { slug: "view-mode", label: t("projects.viewMode") },
        { slug: "create", label: t("projects.create") },
        { slug: "edit", label: t("projects.edit") },
        { slug: "delete", label: t("projects.delete") },
        { slug: "status-change", label: t("projects.statusChange") },
        { slug: "filters", label: t("projects.filters") },
        { slug: "sorting", label: t("projects.sorting") },
        { slug: "categories", label: t("projects.categories") },
        { slug: "category-actions", label: t("projects.categoryActions") },
      ],

      tasks: [
        { slug: "", label: t("tasks.heading") },
        { slug: "view-mode", label: t("tasks.viewMode") },
        { slug: "create", label: t("tasks.create") },
        { slug: "edit", label: t("tasks.edit") },
        { slug: "delete", label: t("tasks.delete") },
        { slug: "status-change", label: t("tasks.statusChange") },
        { slug: "filters", label: t("tasks.filters") },
        { slug: "sorting", label: t("tasks.sorting") },
        { slug: "subtasks", label: t("tasks.subtasks") },
        { slug: "subtask-actions", label: t("tasks.subtaskActions") },
        { slug: "categories", label: t("tasks.categories") },
        { slug: "category-actions", label: t("tasks.categoryActions") },
      ],

      team: [
        { slug: "", label: t("team.heading") },
        { slug: "roles", label: t("team.roles") },
        { slug: "view-mode", label: t("team.viewMode") },
        { slug: "create", label: t("team.create") },
        { slug: "edit", label: t("team.edit") },
        { slug: "delete", label: t("team.delete") },
        { slug: "filters", label: t("tasks.filters") },
        { slug: "sorting", label: t("tasks.sorting") },
        { slug: "positions", label: t("team.positions") },
        { slug: "position-actions", label: t("team.positionActions") },
      ],

      customers: [
        { slug: "", label: t("customers.heading") },
        { slug: "view-mode", label: t("customers.viewMode") },
        { slug: "create", label: t("customers.create") },
        { slug: "edit", label: t("customers.edit") },
        { slug: "delete", label: t("customers.delete") },
        { slug: "filters", label: t("tasks.filters") },
        { slug: "sorting", label: t("tasks.sorting") },
        { slug: "companies", label: t("customers.companies") },
        { slug: "company-actions", label: t("customers.companyActions") },
      ],
    };

    const flatPages = Object.entries(pagesMap).flatMap(([section, pages]) =>
      pages.map((page) => ({
        ...page,
        section,
      })),
    );

    const currentSlug = page ?? "";

    const index = flatPages.findIndex(
      (p) => p.section === section && p.slug === currentSlug,
    );

    if (index === -1) return null;

    const prev = flatPages[index - 1];
    const next = flatPages[index + 1];

    const buildHref = (section: string, slug: string) =>
      slug ? `/docs/${section}/${slug}` : `/docs/${section}`;

    return {
      prev: prev
        ? {
            href: buildHref(prev.section, prev.slug),
            description: prev.label,
          }
        : null,
      next: next
        ? {
            href: buildHref(next.section, next.slug),
            description: next.label,
          }
        : null,
    };
  }, [pathname, t]);

  if (!pagination) return null;

  return (
    <div className="flex justify-between gap-4 max-md:my-8 md:my-10">
      {pagination.prev ? (
        <DocsPaginationLink
          href={pagination.prev.href}
          variant="prev"
          description={pagination.prev.description}
        />
      ) : (
        <div />
      )}

      {pagination.next ? (
        <DocsPaginationLink
          href={pagination.next.href}
          variant="next"
          description={pagination.next.description}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
