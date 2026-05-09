import { getTranslations } from "next-intl/server";
import NotFoundPageContainer from "@/common/NotFoundPageContainer";

export default async function NotFound() {
  const t = await getTranslations("app.NotFoundPage");

  return (
    <NotFoundPageContainer
      heading={t("heading")}
      description={t("description")}
      linkHref="/"
      linkLabel={t("toHome")}
    />
  );
}
