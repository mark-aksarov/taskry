"use client";

import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
} from "@/ui/Disclosure";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { DocsNavigationList } from "./DocsNavigationList";
import { DocsNavigationLink } from "./DocsNavigationLink";

export function DocsNavigation() {
  const pathname = usePathname();
  const t = useTranslations("site.docs.DocsNavigation");

  const defaultExpandedKeys = [
    pathname.startsWith("/docs/getting-started") && "getting-started",
    pathname.startsWith("/docs/projects") && "projects",
    pathname.startsWith("/docs/tasks") && "tasks",
    pathname.startsWith("/docs/team") && "team",
    pathname.startsWith("/docs/customers") && "customers",
  ].filter(Boolean) as string[];

  return (
    <nav className="flex w-[220px] flex-col gap-4">
      <DisclosureGroup defaultExpandedKeys={defaultExpandedKeys}>
        {/* Getting Started */}
        <Disclosure id="getting-started">
          <DisclosureHeader>{t("gettingStarted.heading")}</DisclosureHeader>
          <DisclosurePanel>
            <DocsNavigationList>
              <li>
                <DocsNavigationLink
                  href="/docs/getting-started"
                  isActive={pathname === "/docs/getting-started"}
                >
                  {t("gettingStarted.heading")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/getting-started/overview"
                  isActive={pathname === "/docs/getting-started/overview"}
                >
                  {t("gettingStarted.overview")}
                </DocsNavigationLink>
              </li>
            </DocsNavigationList>
          </DisclosurePanel>
        </Disclosure>

        {/* Projects */}
        <Disclosure id="projects">
          <DisclosureHeader>{t("projects.heading")}</DisclosureHeader>
          <DisclosurePanel>
            <DocsNavigationList>
              <li>
                <DocsNavigationLink
                  href="/docs/projects"
                  isActive={pathname === "/docs/projects"}
                >
                  {t("projects.heading")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/view-mode"
                  isActive={pathname === "/docs/projects/view-mode"}
                >
                  {t("projects.viewMode")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/create"
                  isActive={pathname === "/docs/projects/create"}
                >
                  {t("projects.create")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/edit"
                  isActive={pathname === "/docs/projects/edit"}
                >
                  {t("projects.edit")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/delete"
                  isActive={pathname === "/docs/projects/delete"}
                >
                  {t("projects.delete")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/status-change"
                  isActive={pathname === "/docs/projects/status-change"}
                >
                  {t("projects.statusChange")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/filters"
                  isActive={pathname === "/docs/projects/filters"}
                >
                  {t("projects.filters")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/sorting"
                  isActive={pathname === "/docs/projects/sorting"}
                >
                  {t("projects.sorting")}
                </DocsNavigationLink>
              </li>
            </DocsNavigationList>
          </DisclosurePanel>
        </Disclosure>

        {/* Tasks */}
        <Disclosure id="tasks">
          <DisclosureHeader>{t("tasks.heading")}</DisclosureHeader>
          <DisclosurePanel>
            <DocsNavigationList>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks"
                  isActive={pathname === "/docs/tasks"}
                >
                  {t("tasks.heading")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/view-mode"
                  isActive={pathname === "/docs/tasks/view-mode"}
                >
                  {t("tasks.viewMode")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/create"
                  isActive={pathname === "/docs/tasks/create"}
                >
                  {t("tasks.create")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/edit"
                  isActive={pathname === "/docs/tasks/edit"}
                >
                  {t("tasks.edit")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/delete"
                  isActive={pathname === "/docs/tasks/delete"}
                >
                  {t("tasks.delete")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/status-change"
                  isActive={pathname === "/docs/tasks/status-change"}
                >
                  {t("tasks.statusChange")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/filters"
                  isActive={pathname === "/docs/tasks/filters"}
                >
                  {t("tasks.filters")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/sorting"
                  isActive={pathname === "/docs/tasks/sorting"}
                >
                  {t("tasks.sorting")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/subtasks"
                  isActive={pathname === "/docs/tasks/subtasks"}
                >
                  {t("tasks.subtasks")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/subtasks-actions"
                  isActive={pathname === "/docs/tasks/subtasks-actions"}
                >
                  {t("tasks.subtasksActions")}
                </DocsNavigationLink>
              </li>
            </DocsNavigationList>
          </DisclosurePanel>
        </Disclosure>

        {/* Teams */}
        <Disclosure id="team">
          <DisclosureHeader>{t("team.heading")}</DisclosureHeader>
          <DisclosurePanel>
            <DocsNavigationList>
              <li>
                <DocsNavigationLink
                  href="/docs/team"
                  isActive={pathname === "/docs/team"}
                >
                  {t("team.heading")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/roles"
                  isActive={pathname === "/docs/team/roles"}
                >
                  {t("team.roles")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/view-mode"
                  isActive={pathname === "/docs/team/view-mode"}
                >
                  {t("team.viewMode")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/create"
                  isActive={pathname === "/docs/team/create"}
                >
                  {t("team.create")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/edit"
                  isActive={pathname === "/docs/team/edit"}
                >
                  {t("team.edit")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/avatar-change"
                  isActive={pathname === "/docs/team/avatar-change"}
                >
                  {t("team.avatarChange")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/delete"
                  isActive={pathname === "/docs/team/delete"}
                >
                  {t("team.delete")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/positions"
                  isActive={pathname === "/docs/team/positions"}
                >
                  {t("team.positions")}
                </DocsNavigationLink>
              </li>
            </DocsNavigationList>
          </DisclosurePanel>
        </Disclosure>

        {/* Customers */}
        <Disclosure id="customers">
          <DisclosureHeader>{t("customers.heading")}</DisclosureHeader>
          <DisclosurePanel>
            <DocsNavigationList>
              <li>
                <DocsNavigationLink
                  href="/docs/customers"
                  isActive={pathname === "/docs/customers"}
                >
                  {t("customers.heading")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/customers/view-mode"
                  isActive={pathname === "/docs/customers/view-mode"}
                >
                  {t("customers.viewMode")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/customers/create"
                  isActive={pathname === "/docs/customers/create"}
                >
                  {t("customers.create")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/customers/edit"
                  isActive={pathname === "/docs/customers/edit"}
                >
                  {t("customers.edit")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/customers/delete"
                  isActive={pathname === "/docs/customers/delete"}
                >
                  {t("customers.delete")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/customers/companies"
                  isActive={pathname === "/docs/customers/companies"}
                >
                  {t("customers.companies")}
                </DocsNavigationLink>
              </li>
            </DocsNavigationList>
          </DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    </nav>
  );
}
