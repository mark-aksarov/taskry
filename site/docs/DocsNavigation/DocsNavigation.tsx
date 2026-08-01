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
    pathname.startsWith("/docs/clients") && "clients",
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
                  href="/docs/projects/import-export"
                  isActive={pathname === "/docs/projects/import-export"}
                >
                  {t("projects.importExport")}
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
                  href="/docs/tasks/import-export"
                  isActive={pathname === "/docs/tasks/import-export"}
                >
                  {t("tasks.importExport")}
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
                  href="/docs/team/import-export"
                  isActive={pathname === "/docs/team/import-export"}
                >
                  {t("team.importExport")}
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

        {/* Clients */}
        <Disclosure id="clients">
          <DisclosureHeader>{t("clients.heading")}</DisclosureHeader>
          <DisclosurePanel>
            <DocsNavigationList>
              <li>
                <DocsNavigationLink
                  href="/docs/clients"
                  isActive={pathname === "/docs/clients"}
                >
                  {t("clients.heading")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/clients/view"
                  isActive={pathname === "/docs/clients/view"}
                >
                  {t("clients.view")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/clients/actions"
                  isActive={pathname === "/docs/clients/actions"}
                >
                  {t("clients.actions")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/clients/import-export"
                  isActive={pathname === "/docs/clients/import-export"}
                >
                  {t("clients.importExport")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/clients/search"
                  isActive={pathname === "/docs/clients/search"}
                >
                  {t("clients.search")}
                </DocsNavigationLink>
              </li>
              <li>
                <DocsNavigationLink
                  href="/docs/clients/companies"
                  isActive={pathname === "/docs/clients/companies"}
                >
                  {t("clients.companies")}
                </DocsNavigationLink>
              </li>
            </DocsNavigationList>
          </DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    </nav>
  );
}
