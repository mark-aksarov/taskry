import { useTranslations } from "next-intl";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageTemplateProps } from "@/components/layout/types";

export default function ProfileTemplate({
  children,
  ...appHeaderProps
}: PageTemplateProps) {
  const t = useTranslations("app.ProfilePage");

  return (
    <>
      <AppHeader {...appHeaderProps} heading={t("heading")} />
      <main>{children}</main>
    </>
  );
}
