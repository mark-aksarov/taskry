import {
  FeatureItem,
  FeatureItemHeading,
  FeatureItemDescription,
} from "@/site/home/FeatureItem";

import { useTranslations } from "next-intl";
import { Copy, LockKeyhole, ShieldCheck } from "lucide-react";

export function SecurityGrid() {
  const t = useTranslations("site.home.SecurityGrid");

  return (
    <div className="flex max-md:flex-col max-md:gap-4 md:gap-6">
      <FeatureItem>
        <LockKeyhole
          size={32}
          absoluteStrokeWidth
          strokeWidth={2}
          className="text-blue-500"
        />

        <FeatureItemHeading>{t("access.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("access.description")}
        </FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <ShieldCheck
          size={32}
          absoluteStrokeWidth
          strokeWidth={2}
          className="text-blue-500"
        />

        <FeatureItemHeading>{t("ddos.title")}</FeatureItemHeading>

        <FeatureItemDescription>{t("ddos.description")}</FeatureItemDescription>
      </FeatureItem>

      <FeatureItem>
        <Copy
          size={32}
          absoluteStrokeWidth
          strokeWidth={2}
          className="text-blue-500"
        />

        <FeatureItemHeading>{t("backup.title")}</FeatureItemHeading>

        <FeatureItemDescription>
          {t("backup.description")}
        </FeatureItemDescription>
      </FeatureItem>
    </div>
  );
}
