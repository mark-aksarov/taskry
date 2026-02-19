import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface UsersTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function UsersTemplate({
  searchModal,
  children,
}: UsersTemplateProps) {
  const t = useTranslations("app.UsersPage");

  return (
    <>
      <AppHeader heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
