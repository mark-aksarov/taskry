import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface ProjectCategoriesTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ProjectCategoriesTemplate({
  searchModal,
  children,
}: ProjectCategoriesTemplateProps) {
  const t = useTranslations("app.ProjectCategoriesPage");

  return (
    <>
      <AppHeader backButton heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
