import { useTranslations } from "next-intl";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageTemplateProps } from "@/components/layout/types";

export default function CompaniesTemplate({
  children,
  ...appHeaderProps
}: PageTemplateProps) {
  const t = useTranslations("app.CompaniesPage");

  return (
    <>
      <AppHeader
        {...appHeaderProps}
        backButtonHref="/customers"
        heading={t("heading")}
      />
      <main>{children}</main>
    </>
  );
}
