import {
  SiteCard,
  SiteCardHeading,
  SiteCardDescription,
} from "@/site/common/SiteCard";

import { Badge } from "@/ui/Badge";
import { useTranslations } from "next-intl";

export function RoadmapGrid() {
  const t = useTranslations("site.home.RoadmapGrid");

  return (
    <div className="grid max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4 md:gap-6 lg:grid-cols-3">
      <SiteCard>
        <Badge color="green" className="text-sm">
          {t("basic.badge")}
        </Badge>
        <SiteCardHeading>{t("basic.title")}</SiteCardHeading>
        <SiteCardDescription>{t("basic.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <Badge color="orange" className="text-sm">
          {t("analytics.badge")}
        </Badge>
        <SiteCardHeading>{t("analytics.title")}</SiteCardHeading>
        <SiteCardDescription>{t("analytics.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <Badge color="orange" className="text-sm">
          {t("auth.badge")}
        </Badge>
        <SiteCardHeading>{t("auth.title")}</SiteCardHeading>
        <SiteCardDescription>{t("auth.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <Badge color="gray" className="text-sm">
          {t("settings.badge")}
        </Badge>
        <SiteCardHeading>{t("settings.title")}</SiteCardHeading>
        <SiteCardDescription>{t("settings.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <Badge color="gray" className="text-sm">
          {t("integrations.badge")}
        </Badge>
        <SiteCardHeading>{t("integrations.title")}</SiteCardHeading>
        <SiteCardDescription>
          {t("integrations.description")}
        </SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <Badge color="gray" className="text-sm">
          {t("advanced.badge")}
        </Badge>
        <SiteCardHeading>{t("advanced.title")}</SiteCardHeading>
        <SiteCardDescription>{t("advanced.description")}</SiteCardDescription>
      </SiteCard>
    </div>
  );
}
