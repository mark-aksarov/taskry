import {
  Layers2,
  Folder,
  Calendar,
  Building2,
  CheckSquare,
  MessageSquare,
} from "lucide-react";

import {
  SiteCard,
  SiteCardHeading,
  SiteCardDescription,
} from "@/site/common/SiteCard";

import { useTranslations } from "next-intl";
import { IconWrapper } from "../common/IconWrapper";

export function FeatureGrid() {
  const t = useTranslations("site.home.FeatureGrid");

  return (
    <div className="grid max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4 md:gap-6 lg:grid-cols-3">
      <SiteCard>
        <IconWrapper color="blue">
          <CheckSquare size={24} />
        </IconWrapper>

        <SiteCardHeading>{t("tasks.title")}</SiteCardHeading>

        <SiteCardDescription>{t("tasks.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <IconWrapper color="orange">
          <Folder size={24} />
        </IconWrapper>

        <SiteCardHeading>{t("projects.title")}</SiteCardHeading>

        <SiteCardDescription>{t("projects.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <IconWrapper color="cyan">
          <Building2 size={24} />
        </IconWrapper>

        <SiteCardHeading>{t("customers.title")}</SiteCardHeading>

        <SiteCardDescription>{t("customers.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <IconWrapper color="indigo">
          <MessageSquare size={24} />
        </IconWrapper>

        <SiteCardHeading>{t("discussion.title")}</SiteCardHeading>

        <SiteCardDescription>{t("discussion.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <IconWrapper color="pink">
          <Layers2 size={24} />
        </IconWrapper>

        <SiteCardHeading>{t("categories.title")}</SiteCardHeading>

        <SiteCardDescription>{t("categories.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <IconWrapper color="teal">
          <Calendar size={24} />
        </IconWrapper>

        <SiteCardHeading>{t("calendar.title")}</SiteCardHeading>

        <SiteCardDescription>{t("calendar.description")}</SiteCardDescription>
      </SiteCard>
    </div>
  );
}
