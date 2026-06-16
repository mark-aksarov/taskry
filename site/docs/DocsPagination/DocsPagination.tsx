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
      projects: [
        { slug: "", label: t("projects.heading") },
        { slug: "view", label: t("projects.view") },
        { slug: "actions", label: t("projects.actions") },
        { slug: "search", label: t("projects.search") },
        { slug: "categories", label: t("projects.categories") },
      ],

      tasks: [
        { slug: "", label: t("tasks.heading") },
        { slug: "view", label: t("tasks.view") },
        { slug: "actions", label: t("tasks.actions") },
        { slug: "search", label: t("tasks.search") },
        { slug: "subtasks", label: t("tasks.subtasks") },
        { slug: "categories", label: t("tasks.categories") },
      ],

      team: [
        { slug: "", label: t("team.heading") },
        { slug: "roles", label: t("team.roles") },
        { slug: "view-mode", label: t("team.viewMode") },
        { slug: "create", label: t("team.create") },
        { slug: "edit", label: t("team.edit") },
        { slug: "delete", label: t("team.delete") },
        { slug: "filters", label: t("team.filters") },
        { slug: "sorting", label: t("team.sorting") },
        { slug: "positions", label: t("team.positions") },
        { slug: "position-actions", label: t("team.positionActions") },
      ],

      customers: [
        { slug: "", label: t("customers.heading") },
        { slug: "view-mode", label: t("customers.viewMode") },
        { slug: "create", label: t("customers.create") },
        { slug: "edit", label: t("customers.edit") },
        { slug: "delete", label: t("customers.delete") },
        { slug: "filters", label: t("customers.filters") },
        { slug: "sorting", label: t("customers.sorting") },
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
          className="text-right"
        />
      ) : (
        <div />
      )}
    </div>
  );
}
