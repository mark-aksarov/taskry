import { useTranslations } from "next-intl";
import { NavigationButton } from "../common/NavigationButton";

export function DocsGrid() {
  const t = useTranslations("site.blocks.DocsGrid");

  return (
    <div className="grid gap-4 max-md:grid-cols-1 md:grid-cols-2">
      <NavigationButton
        href="/docs/getting-started"
        heading={t("quickGuide.heading")}
        subtext={t("quickGuide.subtext")}
      />
      <NavigationButton
        href="/docs/comments"
        heading={t("comments.heading")}
        subtext={t("comments.subtext")}
      />
      <NavigationButton
        href="/docs/project-management"
        heading={t("projectManagement.heading")}
        subtext={t("projectManagement.subtext")}
      />
      <NavigationButton
        href="/docs/users-roles-permissions"
        heading={t("usersRoles.heading")}
        subtext={t("usersRoles.subtext")}
      />
      <NavigationButton
        href="/docs/tasks"
        heading={t("tasks.heading")}
        subtext={t("tasks.subtext")}
      />
      <NavigationButton
        href="/docs/search-filter"
        heading={t("searchFilter.heading")}
        subtext={t("searchFilter.subtext")}
      />
      <NavigationButton
        href="/docs/categories"
        heading={t("categories.heading")}
        subtext={t("categories.subtext")}
      />
      <NavigationButton
        href="/docs/clients-companies"
        heading={t("clientsCompanies.heading")}
        subtext={t("clientsCompanies.subtext")}
      />
    </div>
  );
}
