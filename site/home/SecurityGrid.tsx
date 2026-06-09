import {
  SiteCard,
  SiteCardHeading,
  SiteCardDescription,
} from "@/site/common/SiteCard";

import { useTranslations } from "next-intl";
import { Copy, LockKeyhole, ShieldCheck } from "lucide-react";

export function SecurityGrid() {
  const t = useTranslations("site.home.SecurityGrid");

  return (
    <div className="flex max-md:flex-col max-md:gap-4 md:gap-6">
      <SiteCard>
        <LockKeyhole
          size={32}
          absoluteStrokeWidth
          strokeWidth={2}
          className="text-blue-500"
        />

        <SiteCardHeading>{t("access.title")}</SiteCardHeading>

        <SiteCardDescription>{t("access.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <ShieldCheck
          size={32}
          absoluteStrokeWidth
          strokeWidth={2}
          className="text-blue-500"
        />

        <SiteCardHeading>{t("ddos.title")}</SiteCardHeading>

        <SiteCardDescription>{t("ddos.description")}</SiteCardDescription>
      </SiteCard>

      <SiteCard>
        <Copy
          size={32}
          absoluteStrokeWidth
          strokeWidth={2}
          className="text-blue-500"
        />

        <SiteCardHeading>{t("backup.title")}</SiteCardHeading>

        <SiteCardDescription>{t("backup.description")}</SiteCardDescription>
      </SiteCard>
    </div>
  );
}
