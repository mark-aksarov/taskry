import { AppHeader } from "@/components/layout/AppHeader";
import { useTranslations } from "next-intl";

interface TasksTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function TasksTemplate({
  searchModal,
  children,
}: TasksTemplateProps) {
  const t = useTranslations("app.TasksPage");

  return (
    <>
      <AppHeader heading={t("heading")} searchModal={searchModal} />
      <main>{children}</main>
    </>
  );
}
