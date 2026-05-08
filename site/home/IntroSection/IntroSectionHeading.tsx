import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";

const introHeadingStyles = tv({
  slots: {
    root: [
      "mb-6",
      "font-extrabold",
      "text-(--text-primary)",
      "max-lg:text-7xl max-md:text-6xl lg:text-8xl",
      "max-sm:text-start",
    ],
    highlight: "text-blue-600 dark:text-blue-400",
    breakSm: "sm:hidden",
  },
});

export function IntroSectionHeading() {
  const t = useTranslations("site.sections.IntroSection");
  const s = introHeadingStyles();

  return (
    <h1 className={s.root()}>
      {t("heading.line1")} <br className={s.breakSm()} />
      {t("heading.line2")}
      <br />
      <span className={s.highlight()}>
        {t("heading.line3")} <br className={s.breakSm()} />
        {t("heading.line4")}
      </span>
    </h1>
  );
}
