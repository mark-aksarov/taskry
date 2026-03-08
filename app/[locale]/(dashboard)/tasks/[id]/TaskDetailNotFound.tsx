import {
  AppHeader,
  AppHeaderContainerProps,
} from "@/components/layout/AppHeader";

import { useTranslations } from "next-intl";
import NotFoundPageContainer from "@/components/layout/NotFoundPageContainer";

export default function TaskDetailNotFound({
  appHeaderProps,
}: {
  appHeaderProps: AppHeaderContainerProps;
}) {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <>
      <AppHeader {...appHeaderProps} heading={t("heading")} />
      <main>
        <NotFoundPageContainer
          heading={t("notFound.heading")}
          description={t("notFound.description")}
          linkLabel={t("notFound.toTasks")}
          linkHref="/tasks"
          headerOffset
        />
      </main>
    </>
  );
}
