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
    pathname.startsWith("/docs/general") && "general",
    pathname.startsWith("/docs/getting-started") && "getting-started",
    pathname.startsWith("/docs/projects") && "projects",
    pathname.startsWith("/docs/tasks") && "tasks",
    pathname.startsWith("/docs/team") && "team",
    pathname.startsWith("/docs/customers") && "customers",
  ].filter(Boolean) as string[];

  return (
    <nav className="flex w-[250px] flex-col gap-4">
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

        {/* General*/}
        <Disclosure id="general">
          <DisclosureHeader>{t("general.heading")}</DisclosureHeader>
          <DisclosurePanel>
            <DocsNavigationList>
              <li>
                <DocsNavigationLink
                  href="/docs/general"
                  isActive={pathname === "/docs/general"}
                >
                  {t("general.heading")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/general/sign-up"
                  isActive={pathname === "/docs/general/sign-up"}
                >
                  {t("general.signUp")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/general/sign-in"
                  isActive={pathname === "/docs/general/sign-in"}
                >
                  {t("general.signIn")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/general/search"
                  isActive={pathname === "/docs/general/search"}
                >
                  {t("general.search")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/general/lang-theme"
                  isActive={pathname === "/docs/general/lang-theme"}
                >
                  {t("general.langTheme")}
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
              <li>
                <DocsNavigationLink
                  href="/docs/projects/categories"
                  isActive={pathname === "/docs/projects/categories"}
                >
                  {t("projects.categories")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/category-actions"
                  isActive={pathname === "/docs/projects/category-actions"}
                >
                  {t("projects.categoryActions")}
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
                  href="/docs/tasks/subtask-actions"
                  isActive={pathname === "/docs/tasks/subtask-actions"}
                >
                  {t("tasks.subtaskActions")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/categories"
                  isActive={pathname === "/docs/tasks/categories"}
                >
                  {t("tasks.categories")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/category-actions"
                  isActive={pathname === "/docs/tasks/category-actions"}
                >
                  {t("tasks.categoryActions")}
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
                  href="/docs/team/delete"
                  isActive={pathname === "/docs/team/delete"}
                >
                  {t("team.delete")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/filters"
                  isActive={pathname === "/docs/team/filters"}
                >
                  {t("team.filters")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/sorting"
                  isActive={pathname === "/docs/team/sorting"}
                >
                  {t("team.sorting")}
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
              <li>
                <DocsNavigationLink
                  href="/docs/team/position-actions"
                  isActive={pathname === "/docs/team/position-actions"}
                >
                  {t("team.positionActions")}
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
                  href="/docs/customers/filters"
                  isActive={pathname === "/docs/customers/filters"}
                >
                  {t("customers.filters")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/customers/sorting"
                  isActive={pathname === "/docs/customers/sorting"}
                >
                  {t("customers.sorting")}
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
              <li>
                <DocsNavigationLink
                  href="/docs/customers/company-actions"
                  isActive={pathname === "/docs/customers/company-actions"}
                >
                  {t("customers.companyActions")}
                </DocsNavigationLink>
              </li>
            </DocsNavigationList>
          </DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    </nav>
  );
}
