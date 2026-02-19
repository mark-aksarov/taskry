import { useTranslations } from "next-intl";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageTemplateProps } from "@/components/layout/types";

export default function UsersTemplate({
  children,
  ...appHeaderProps
}: PageTemplateProps) {
  const t = useTranslations("app.UsersPage");

  return (
    <>
      <AppHeader {...appHeaderProps} heading={t("heading")} />
      <main>{children}</main>
    </>
  );
}
