import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface ProjectsTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ProjectsTemplate({
  searchModal,
  children,
}: ProjectsTemplateProps) {
  const t = useTranslations("app.ProjectsPage");

  return (
    <>
      <AppHeader heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
