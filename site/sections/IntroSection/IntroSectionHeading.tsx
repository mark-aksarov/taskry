import { useTranslations } from "next-intl";

export function IntroSectionHeading() {
  const t = useTranslations("site.sections.IntroSection");

  return (
    <h1 className="mb-6 font-extrabold text-black max-lg:text-7xl max-md:text-6xl max-sm:text-start lg:text-8xl dark:text-white">
      {t("heading.line1")} <br className="sm:hidden" />
      {t("heading.line2")}
      <br />
      <span className="text-blue-600 dark:text-blue-400">
        {t("heading.line3")} <br className="sm:hidden" />
        {t("heading.line4")}
      </span>
    </h1>
  );
}
