import { getTranslations } from "next-intl/server";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import NotFoundPageContainer from "@/dashboard/layout/NotFoundPageContainer";

export default async function NotFound() {
  await requireProtectedPage();

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
