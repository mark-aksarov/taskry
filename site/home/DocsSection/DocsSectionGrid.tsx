import { useTranslations } from "next-intl";
import { DocsSectionCard } from "./DocsSectionCard";
import { IconWrapper } from "@/site/common/IconWrapper";
import { UserCog, Building2, CheckSquare, FolderKanban } from "lucide-react";

export function DocsSectionGrid() {
  const t = useTranslations("site.home.DocsSectionGrid");

  return (
    <div className="grid gap-4 max-md:grid-cols-1 md:grid-cols-2">
      <DocsSectionCard
        iconLeft={
          <IconWrapper color="purple">
            <FolderKanban size={24} />
          </IconWrapper>
        }
        href="/docs/projects"
        heading={t("projects.heading")}
        subtext={t("projects.subtext")}
      />

      <DocsSectionCard
        iconLeft={
          <IconWrapper color="pink">
            <UserCog size={24} />
          </IconWrapper>
        }
        href="/docs/team"
        heading={t("users.heading")}
        subtext={t("users.subtext")}
      />

      <DocsSectionCard
        iconLeft={
          <IconWrapper color="orange">
            <CheckSquare size={24} />
          </IconWrapper>
        }
        href="/docs/tasks"
        heading={t("tasks.heading")}
        subtext={t("tasks.subtext")}
      />

      <DocsSectionCard
        iconLeft={
          <IconWrapper color="teal">
            <Building2 size={24} />
          </IconWrapper>
        }
        href="/docs/customers"
        heading={t("customers.heading")}
        subtext={t("customers.subtext")}
      />
    </div>
  );
}
