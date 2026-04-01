import { useTranslations } from "next-intl";
import NotFoundPageContainer from "@/components/layout/NotFoundPageContainer";

export default function NotFound() {
  const t = useTranslations("app.TasksPage");

  return (
    <NotFoundPageContainer
      headerOffset
      heading={t("error.notFound.heading")}
      description={t("error.notFound.description")}
      linkHref={"/tasks"}
      linkLabel={t("error.notFound.buttonLabel")}
    />
  );
}
