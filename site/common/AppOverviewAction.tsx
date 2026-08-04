import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { PageSectionActionLink } from "./PageSection";

export function AppOverviewAction() {
  const t = useTranslations("site.common.AppOverviewAction");

  return (
    <PageSectionActionLink
      href="/docs/app-overview"
      className="bg-transparent"
      variant="secondary"
      outlined
      label={t("label")}
      iconLeft={<FileText size={20} />}
    />
  );
}
