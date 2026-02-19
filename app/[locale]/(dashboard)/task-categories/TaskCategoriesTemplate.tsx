import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface TaskCategoriesTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function TaskCategoriesTemplate({
  searchModal,
  children,
}: TaskCategoriesTemplateProps) {
  const t = useTranslations("app.TaskCategoriesPage");

  return (
    <>
      <AppHeader backButton heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
