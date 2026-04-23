import {
  Layers,
  Search,
  UserCog,
  BookOpen,
  Building2,
  CheckSquare,
  FolderKanban,
  MessageSquare,
} from "lucide-react";

import { useTranslations } from "next-intl";
import { IconWrapper } from "../common/IconWrapper";
import { NavigationLink } from "../common/NavigationLink";

export function DocsGrid() {
  const t = useTranslations("site.blocks.DocsGrid");

  return (
    <div className="grid gap-4 max-md:grid-cols-1 md:grid-cols-2">
      <NavigationLink
        iconLeft={
          <IconWrapper color="blue">
            <BookOpen size={24} />
          </IconWrapper>
        }
        href="/docs/getting-started"
        heading={t("quickGuide.heading")}
        subtext={t("quickGuide.subtext")}
      />
      <NavigationLink
        iconLeft={
          <IconWrapper color="indigo">
            <MessageSquare size={24} />
          </IconWrapper>
        }
        href="/docs/comments"
        heading={t("comments.heading")}
        subtext={t("comments.subtext")}
      />
      <NavigationLink
        iconLeft={
          <IconWrapper color="purple">
            <FolderKanban size={24} />
          </IconWrapper>
        }
        href="/docs/project-management"
        heading={t("projectManagement.heading")}
        subtext={t("projectManagement.subtext")}
      />
      <NavigationLink
        iconLeft={
          <IconWrapper color="pink">
            <UserCog size={24} />
          </IconWrapper>
        }
        href="/docs/users-roles-permissions"
        heading={t("usersRoles.heading")}
        subtext={t("usersRoles.subtext")}
      />
      <NavigationLink
        iconLeft={
          <IconWrapper color="orange">
            <CheckSquare size={24} />
          </IconWrapper>
        }
        href="/docs/tasks"
        heading={t("tasks.heading")}
        subtext={t("tasks.subtext")}
      />
      <NavigationLink
        iconLeft={
          <IconWrapper color="teal">
            <Search size={24} />
          </IconWrapper>
        }
        href="/docs/search-filter"
        heading={t("searchFilter.heading")}
        subtext={t("searchFilter.subtext")}
      />
      <NavigationLink
        iconLeft={
          <IconWrapper color="cyan">
            <Layers size={24} />
          </IconWrapper>
        }
        href="/docs/categories"
        heading={t("categories.heading")}
        subtext={t("categories.subtext")}
      />
      <NavigationLink
        iconLeft={
          <IconWrapper color="emerald">
            <Building2 size={24} />
          </IconWrapper>
        }
        href="/docs/clients-companies"
        heading={t("clientsCompanies.heading")}
        subtext={t("clientsCompanies.subtext")}
      />
    </div>
  );
}
