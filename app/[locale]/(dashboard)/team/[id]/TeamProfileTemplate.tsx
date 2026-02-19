import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface TeamProfileTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function TeamProfileTemplate({
  searchModal,
  children,
}: TeamProfileTemplateProps) {
  const t = useTranslations("app.TeamProfilePage");

  return (
    <>
      <AppHeader backButton heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
