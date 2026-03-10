import NotFoundPageContainer from "@/components/layout/NotFoundPageContainer";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("app.NotFoundPage");

  return (
    <NotFoundPageContainer
      heading={t("heading")}
      description={t("description")}
      linkHref="/"
      linkLabel={t("toHome")}
    />
  );
}
