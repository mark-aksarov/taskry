import { useTranslations } from "next-intl";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageTemplateProps } from "@/components/layout/types";

export default function PositionsTemplate({
  children,
  ...appHeaderProps
}: PageTemplateProps) {
  const t = useTranslations("app.PositionsPage");

  return (
    <>
      <AppHeader
        {...appHeaderProps}
        backButtonHref="/team"
        heading={t("heading")}
      />
      <main>{children}</main>
    </>
  );
}
