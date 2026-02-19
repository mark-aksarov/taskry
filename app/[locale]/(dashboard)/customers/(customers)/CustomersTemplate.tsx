import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface CustomersTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function CustomersTemplate({
  searchModal,
  children,
}: CustomersTemplateProps) {
  const t = useTranslations("app.CustomersPage");

  return (
    <>
      <AppHeader heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
