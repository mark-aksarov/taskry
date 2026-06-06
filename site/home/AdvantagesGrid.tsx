import {
  FeatureItem,
  FeatureItemHeading,
  FeatureItemDescription,
} from "@/site/home/FeatureItem";

import { useTranslations } from "next-intl";
import { CodeXml, Gift, Sparkles, Zap } from "lucide-react";

export function AdvantagesGrid() {
  const t = useTranslations("site.home.AdvantagesGrid");
  const headerClassName = "flex items-center gap-2";

  return (
    <div className="flex w-full max-w-[800px] flex-col max-md:gap-4 md:gap-6">
      <FeatureItem>
        <div className={headerClassName}>
          <Zap
            size={24}
            absoluteStrokeWidth
            strokeWidth={2}
            className="text-amber-500"
          />
          <FeatureItemHeading>{t("fast.title")}</FeatureItemHeading>
        </div>

        <FeatureItemDescription>{t("fast.description")}</FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <div className={headerClassName}>
          <Sparkles
            size={24}
            absoluteStrokeWidth
            strokeWidth={2}
            className="text-sky-500"
          />
          <FeatureItemHeading>{t("simple.title")}</FeatureItemHeading>
        </div>

        <FeatureItemDescription>
          {t("simple.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <div className={headerClassName}>
          <Gift
            size={24}
            absoluteStrokeWidth
            strokeWidth={2}
            className="text-emerald-500"
          />
          <FeatureItemHeading>{t("free.title")}</FeatureItemHeading>
        </div>

        <FeatureItemDescription>{t("free.description")}</FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <div className={headerClassName}>
          <CodeXml
            size={24}
            absoluteStrokeWidth
            strokeWidth={2}
            className="text-violet-500"
          />
          <FeatureItemHeading>{t("openSource.title")}</FeatureItemHeading>
        </div>

        <FeatureItemDescription>
          {t("openSource.description")}
        </FeatureItemDescription>
      </FeatureItem>
    </div>
  );
}
