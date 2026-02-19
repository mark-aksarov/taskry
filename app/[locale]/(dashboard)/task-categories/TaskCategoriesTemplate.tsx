import { useTranslations } from "next-intl";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageTemplateProps } from "@/components/layout/types";

export default function TaskCategoriesTemplate({
  children,
  ...appHeaderProps
}: PageTemplateProps) {
  const t = useTranslations("app.TaskCategoriesPage");

  return (
    <>
      <AppHeader {...appHeaderProps} backButton heading={t("heading")} />
      <main>{children}</main>
    </>
  );
}
