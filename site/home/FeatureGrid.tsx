import {
  Layers2,
  Folder,
  Calendar,
  Building2,
  CheckSquare,
  MessageSquare,
} from "lucide-react";

import {
  FeatureItem,
  FeatureItemHeading,
  FeatureItemDescription,
} from "@/site/home/FeatureItem";

import { useTranslations } from "next-intl";
import { IconWrapper } from "../common/IconWrapper";

export function FeatureGrid() {
  const t = useTranslations("site.home.FeatureGrid");

  return (
    <div className="grid max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4 md:gap-6 lg:grid-cols-3">
      <FeatureItem>
        <IconWrapper color="blue">
          <CheckSquare size={24} />
        </IconWrapper>

        <FeatureItemHeading>{t("tasks.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("tasks.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <IconWrapper color="orange">
          <Folder size={24} />
        </IconWrapper>

        <FeatureItemHeading>{t("projects.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("projects.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <IconWrapper color="cyan">
          <Building2 size={24} />
        </IconWrapper>

        <FeatureItemHeading>{t("customers.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("customers.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <IconWrapper color="indigo">
          <MessageSquare size={24} />
        </IconWrapper>

        <FeatureItemHeading>{t("discussion.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("discussion.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <IconWrapper color="pink">
          <Layers2 size={24} />
        </IconWrapper>

        <FeatureItemHeading>{t("categories.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("categories.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <IconWrapper color="teal">
          <Calendar size={24} />
        </IconWrapper>

        <FeatureItemHeading>{t("calendar.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("calendar.description")}
        </FeatureItemDescription>
      </FeatureItem>
    </div>
  );
}
