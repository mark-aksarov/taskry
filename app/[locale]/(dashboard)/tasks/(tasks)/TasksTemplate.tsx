import { AppHeader } from "@/components/layout/AppHeader";
import { PageTemplateProps } from "@/components/layout/types";
import { useTranslations } from "next-intl";

export default function TasksTemplate({
  children,
  ...appHeaderProps
}: PageTemplateProps) {
  const t = useTranslations("app.TasksPage");

  return (
    <>
      <AppHeader {...appHeaderProps} heading={t("heading")} />
      <main>{children}</main>
    </>
  );
}
