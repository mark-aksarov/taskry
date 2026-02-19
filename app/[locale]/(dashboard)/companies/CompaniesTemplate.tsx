import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface CompaniesTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function CompaniesTemplate({
  searchModal,
  children,
}: CompaniesTemplateProps) {
  const t = useTranslations("app.CompaniesPage");

  return (
    <>
      <AppHeader backButton heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
