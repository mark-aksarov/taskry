import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface ProfileTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ProfileTemplate({
  searchModal,
  children,
}: ProfileTemplateProps) {
  const t = useTranslations("app.ProfilePage");

  return (
    <>
      <AppHeader heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
