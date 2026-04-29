"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Breadcrumb, Breadcrumbs } from "@/ui/Breadcrumbs";

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("site.docs.DocsNavigation");

  let second: string | null = null;

  // Projects
  if (pathname === "/docs/projects-view-mode") {
    second = t("projects.viewMode");
  } else if (pathname === "/docs/projects-creation") {
    second = t("projects.creation");
  } else if (pathname === "/docs/projects-editing") {
    second = t("projects.editing");
  } else if (pathname === "/docs/projects-deletion") {
    second = t("projects.deletion");
  } else if (pathname === "/docs/projects-status-change") {
    second = t("projects.changeStatus");
  } else if (pathname === "/docs/projects-filters") {
    second = t("projects.filters");
  } else if (pathname === "/docs/projects-sorting") {
    second = t("projects.sorting");
  } else if (pathname === "/docs/projects-categories") {
    second = t("projects.categories");

    // Tasks
  } else if (pathname === "/docs/tasks-view-mode") {
    second = t("tasks.viewMode");
  } else if (pathname === "/docs/tasks-creation") {
    second = t("tasks.creation");
  } else if (pathname === "/docs/tasks-editing") {
    second = t("tasks.editing");
  } else if (pathname === "/docs/tasks-deletion") {
    second = t("tasks.deletion");
  } else if (pathname === "/docs/tasks-change-status") {
    second = t("tasks.changeStatus");
  } else if (pathname === "/docs/tasks-filters") {
    second = t("tasks.filters");
  } else if (pathname === "/docs/tasks-sorting") {
    second = t("tasks.sorting");
  } else if (pathname === "/docs/tasks-categories") {
    second = t("tasks.categories");

    // Teams
  } else if (pathname === "/docs/teams-roles") {
    second = t("teams.roles");
  } else if (pathname === "/docs/teams-users-view") {
    second = t("teams.view");
  } else if (pathname === "/docs/teams-user-add") {
    second = t("teams.add");
  } else if (pathname === "/docs/teams-user-edit") {
    second = t("teams.edit");
  } else if (pathname === "/docs/teams-user-delete") {
    second = t("teams.delete");
  } else if (pathname === "/docs/teams-positions") {
    second = t("teams.positions");

    // Clients
  } else if (pathname === "/docs/clients-view") {
    second = t("clients.view");
  } else if (pathname === "/docs/clients-creation") {
    second = t("clients.creation");
  } else if (pathname === "/docs/clients-editing") {
    second = t("clients.editing");
  } else if (pathname === "/docs/clients-deletion") {
    second = t("clients.deletion");
  } else if (pathname === "/docs/clients-companies") {
    second = t("clients.companies");
  }

  return (
    <Breadcrumbs className="max-md:mb-6 md:mb-8">
      <Breadcrumb>{t("breadcrumbs")}</Breadcrumb>
      {second && <Breadcrumb>{second}</Breadcrumb>}
    </Breadcrumbs>
  );
}
