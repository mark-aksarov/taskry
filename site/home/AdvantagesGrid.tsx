import {
  SiteCard,
  SiteCardHeading,
  SiteCardDescription,
} from "@/site/common/SiteCard";

import { useTranslations } from "next-intl";
import { CodeXml, Gift, Sparkles, Zap } from "lucide-react";

export function AdvantagesGrid() {
  const t = useTranslations("site.home.AdvantagesGrid");
  const headerClassName = "flex items-center gap-2";

  return (
    <div className="flex w-full max-w-[800px] flex-col max-md:gap-4 md:gap-6">
      <SiteCard>
        <div className={headerClassName}>
          <Zap
            size={24}
            absoluteStrokeWidth
            strokeWidth={2}
            className="text-amber-500"
          />
          <SiteCardHeading>{t("fast.title")}</SiteCardHeading>
        </div>

        <SiteCardDescription>{t("fast.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <div className={headerClassName}>
          <Sparkles
            size={24}
            absoluteStrokeWidth
            strokeWidth={2}
            className="text-sky-500"
          />
          <SiteCardHeading>{t("simple.title")}</SiteCardHeading>
        </div>

        <SiteCardDescription>{t("simple.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <div className={headerClassName}>
          <Gift
            size={24}
            absoluteStrokeWidth
            strokeWidth={2}
            className="text-emerald-500"
          />
          <SiteCardHeading>{t("free.title")}</SiteCardHeading>
        </div>

        <SiteCardDescription>{t("free.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <div className={headerClassName}>
          <CodeXml
            size={24}
            absoluteStrokeWidth
            strokeWidth={2}
            className="text-violet-500"
          />
          <SiteCardHeading>{t("openSource.title")}</SiteCardHeading>
        </div>

        <SiteCardDescription>{t("openSource.description")}</SiteCardDescription>
      </SiteCard>
    </div>
  );
}
