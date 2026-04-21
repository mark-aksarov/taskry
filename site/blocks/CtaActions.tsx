import { useTranslations } from "next-intl";
import { PageSectionAction, PageSectionActions } from "../common/PageSection";

export function CtaActions() {
  const t = useTranslations("site.blocks.CtaActions");

  return (
    <PageSectionActions>
      <PageSectionAction
        as="a"
        href="/dashboard"
        label={t("GetStartedButton.label")}
      />
      <PageSectionAction
        as="a"
        href="/dashboard"
        variant="outlined"
        label={t("DemoButton.label")}
      />
    </PageSectionActions>
  );
}
