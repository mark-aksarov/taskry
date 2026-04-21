import {
  FeatureItem,
  FeatureItemHeading,
  FeatureItemDescription,
  FeatureItemIconWrapper,
} from "@/site/blocks/FeatureItem";

import {
  Layers2,
  Folder,
  Calendar,
  Building2,
  CheckSquare,
  MessageSquare,
} from "lucide-react";

import { useTranslations } from "next-intl";

export function FeatureGrid() {
  const t = useTranslations("site.blocks.FeatureGrid");

  return (
    <div className="grid max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4 md:gap-6 lg:grid-cols-3">
      <FeatureItem>
        <FeatureItemIconWrapper>
          <CheckSquare size={24} />
        </FeatureItemIconWrapper>

        <FeatureItemHeading>{t("tasks.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("tasks.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <FeatureItemIconWrapper>
          <Folder size={24} />
        </FeatureItemIconWrapper>

        <FeatureItemHeading>{t("projects.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("projects.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <FeatureItemIconWrapper>
          <Building2 size={24} />
        </FeatureItemIconWrapper>

        <FeatureItemHeading>{t("customers.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("customers.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <FeatureItemIconWrapper>
          <MessageSquare size={24} />
        </FeatureItemIconWrapper>

        <FeatureItemHeading>{t("discussion.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("discussion.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <FeatureItemIconWrapper>
          <Layers2 size={24} />
        </FeatureItemIconWrapper>

        <FeatureItemHeading>{t("categories.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("categories.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <FeatureItemIconWrapper>
          <Calendar size={24} />
        </FeatureItemIconWrapper>

        <FeatureItemHeading>{t("calendar.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("calendar.description")}
        </FeatureItemDescription>
      </FeatureItem>
    </div>
  );
}
