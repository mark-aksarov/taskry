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
    pathname.startsWith("/docs/projects") && "projects",
    pathname.startsWith("/docs/tasks") && "tasks",
    pathname.startsWith("/docs/team") && "team",
    pathname.startsWith("/docs/customers") && "customers",
  ].filter(Boolean) as string[];

  return (
    <nav className="flex w-[250px] flex-col gap-4">
      <DisclosureGroup defaultExpandedKeys={defaultExpandedKeys}>
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
                  href="/docs/projects/view"
                  isActive={pathname === "/docs/projects/view"}
                >
                  {t("projects.view")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/actions"
                  isActive={pathname === "/docs/projects/actions"}
                >
                  {t("projects.actions")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/projects/search"
                  isActive={pathname === "/docs/projects/search"}
                >
                  {t("projects.search")}
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
                  href="/docs/tasks/view"
                  isActive={pathname === "/docs/tasks/view"}
                >
                  {t("tasks.view")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/actions"
                  isActive={pathname === "/docs/tasks/actions"}
                >
                  {t("tasks.actions")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/tasks/search"
                  isActive={pathname === "/docs/tasks/search"}
                >
                  {t("tasks.search")}
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
                  href="/docs/tasks/categories"
                  isActive={pathname === "/docs/tasks/categories"}
                >
                  {t("tasks.categories")}
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
                  href="/docs/team/view"
                  isActive={pathname === "/docs/team/view"}
                >
                  {t("team.view")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/actions"
                  isActive={pathname === "/docs/team/actions"}
                >
                  {t("team.actions")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/team/search"
                  isActive={pathname === "/docs/team/search"}
                >
                  {t("team.search")}
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
                  href="/docs/customers/view"
                  isActive={pathname === "/docs/customers/view"}
                >
                  {t("customers.view")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/customers/actions"
                  isActive={pathname === "/docs/customers/actions"}
                >
                  {t("customers.actions")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/customers/search"
                  isActive={pathname === "/docs/customers/search"}
                >
                  {t("customers.search")}
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
