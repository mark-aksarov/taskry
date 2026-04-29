"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { DocsNavigationList } from "./DocsNavigationList";
import { DocsNavigationLink } from "./DocsNavigationLink";
import { DocsNavigationHeading } from "./DocsNavigationHeading";

export function DocsNavigation() {
  const pathname = usePathname();
  const t = useTranslations("site.docs.DocsNavigation");

  return (
    <nav className="flex flex-col gap-4">
      {/* Projects */}
      <DocsNavigationHeading>{t("projects.heading")}</DocsNavigationHeading>

      <DocsNavigationList>
        <li>
          <DocsNavigationLink
            href="/docs/projects-view-mode"
            isActive={pathname === "/docs/projects-view-mode"}
          >
            {t("projects.viewMode")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/projects-creation"
            isActive={pathname === "/docs/projects-creation"}
          >
            {t("projects.creation")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/projects-editing"
            isActive={pathname === "/docs/projects-editing"}
          >
            {t("projects.editing")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/projects-deletion"
            isActive={pathname === "/docs/projects-deletion"}
          >
            {t("projects.deletion")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/projects-status-change"
            isActive={pathname === "/docs/projects-status-change"}
          >
            {t("projects.changeStatus")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/projects-filters"
            isActive={pathname === "/docs/projects-filters"}
          >
            {t("projects.filters")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/projects-sorting"
            isActive={pathname === "/docs/projects-sorting"}
          >
            {t("projects.sorting")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/projects-categories"
            isActive={pathname === "/docs/projects-categories"}
          >
            {t("projects.categories")}
          </DocsNavigationLink>
        </li>
      </DocsNavigationList>

      {/* Tasks */}
      <DocsNavigationHeading>{t("tasks.heading")}</DocsNavigationHeading>

      <DocsNavigationList>
        <li>
          <DocsNavigationLink
            href="/docs/tasks-view-mode"
            isActive={pathname === "/docs/tasks-view-mode"}
          >
            {t("tasks.viewMode")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/tasks-creation"
            isActive={pathname === "/docs/tasks-creation"}
          >
            {t("tasks.creation")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/tasks-editing"
            isActive={pathname === "/docs/tasks-editing"}
          >
            {t("tasks.editing")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/tasks-deletion"
            isActive={pathname === "/docs/tasks-deletion"}
          >
            {t("tasks.deletion")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/tasks-change-status"
            isActive={pathname === "/docs/tasks-change-status"}
          >
            {t("tasks.changeStatus")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/tasks-filters"
            isActive={pathname === "/docs/tasks-filters"}
          >
            {t("tasks.filters")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/tasks-sorting"
            isActive={pathname === "/docs/tasks-sorting"}
          >
            {t("tasks.sorting")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/tasks-categories"
            isActive={pathname === "/docs/tasks-categories"}
          >
            {t("tasks.categories")}
          </DocsNavigationLink>
        </li>
      </DocsNavigationList>

      {/* Teams */}
      <DocsNavigationHeading>{t("teams.heading")}</DocsNavigationHeading>

      <DocsNavigationList>
        <li>
          <DocsNavigationLink
            href="/docs/teams-roles"
            isActive={pathname === "/docs/teams-roles"}
          >
            {t("teams.roles")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/teams-users-view"
            isActive={pathname === "/docs/teams-users-view"}
          >
            {t("teams.view")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/teams-user-add"
            isActive={pathname === "/docs/teams-user-add"}
          >
            {t("teams.add")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/teams-user-edit"
            isActive={pathname === "/docs/teams-user-edit"}
          >
            {t("teams.edit")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/teams-user-delete"
            isActive={pathname === "/docs/teams-user-delete"}
          >
            {t("teams.delete")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/teams-positions"
            isActive={pathname === "/docs/teams-positions"}
          >
            {t("teams.positions")}
          </DocsNavigationLink>
        </li>
      </DocsNavigationList>

      {/* Clients */}
      <DocsNavigationHeading>{t("clients.heading")}</DocsNavigationHeading>

      <DocsNavigationList>
        <li>
          <DocsNavigationLink
            href="/docs/clients-view"
            isActive={pathname === "/docs/clients-view"}
          >
            {t("clients.view")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/clients-creation"
            isActive={pathname === "/docs/clients-creation"}
          >
            {t("clients.creation")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/clients-editing"
            isActive={pathname === "/docs/clients-editing"}
          >
            {t("clients.editing")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/clients-deletion"
            isActive={pathname === "/docs/clients-deletion"}
          >
            {t("clients.deletion")}
          </DocsNavigationLink>
        </li>
        <li>
          <DocsNavigationLink
            href="/docs/clients-companies"
            isActive={pathname === "/docs/clients-companies"}
          >
            {t("clients.companies")}
          </DocsNavigationLink>
        </li>
      </DocsNavigationList>
    </nav>
  );
}
