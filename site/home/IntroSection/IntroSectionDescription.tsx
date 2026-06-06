import { useTranslations } from "next-intl";
import { PageSectionDescription } from "@/site/common/PageSection";

export function IntroSectionDescription() {
  const t = useTranslations("site.home.IntroSection");

  return (
    <PageSectionDescription className="max-md:text-lg/8 md:text-xl/9">
      {t("description.line1")} <br className="max-sm:hidden" />
      {t("description.line2")}
    </PageSectionDescription>
  );
}
