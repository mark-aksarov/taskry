import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface PositionsTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function PositionsTemplate({
  searchModal,
  children,
}: PositionsTemplateProps) {
  const t = useTranslations("app.PositionsPage");

  return (
    <>
      <AppHeader backButton heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
