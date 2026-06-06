import {
  FeatureItem,
  FeatureItemHeading,
  FeatureItemDescription,
} from "@/site/home/FeatureItem";

import { Badge } from "@/ui/Badge";
import { useTranslations } from "next-intl";

export function RoadmapGrid() {
  const t = useTranslations("site.home.RoadmapGrid");

  return (
    <div className="grid max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4 md:gap-6 lg:grid-cols-3">
      <FeatureItem>
        <Badge color="green" className="text-sm">
          {t("basic.badge")}
        </Badge>
        <FeatureItemHeading>{t("basic.title")}</FeatureItemHeading>
        <FeatureItemDescription>
          {t("basic.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <Badge color="orange" className="text-sm">
          {t("analytics.badge")}
        </Badge>
        <FeatureItemHeading>{t("analytics.title")}</FeatureItemHeading>
        <FeatureItemDescription>
          {t("analytics.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <Badge color="orange" className="text-sm">
          {t("auth.badge")}
        </Badge>
        <FeatureItemHeading>{t("auth.title")}</FeatureItemHeading>
        <FeatureItemDescription>{t("auth.description")}</FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <Badge color="gray" className="text-sm">
          {t("settings.badge")}
        </Badge>
        <FeatureItemHeading>{t("settings.title")}</FeatureItemHeading>
        <FeatureItemDescription>
          {t("settings.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <Badge color="gray" className="text-sm">
          {t("integrations.badge")}
        </Badge>
        <FeatureItemHeading>{t("integrations.title")}</FeatureItemHeading>
        <FeatureItemDescription>
          {t("integrations.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <Badge color="gray" className="text-sm">
          {t("advanced.badge")}
        </Badge>
        <FeatureItemHeading>{t("advanced.title")}</FeatureItemHeading>
        <FeatureItemDescription>
          {t("advanced.description")}
        </FeatureItemDescription>
      </FeatureItem>
    </div>
  );
}
