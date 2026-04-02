import { useTranslations } from "next-intl";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import NotFoundPageContainer from "@/components/layout/NotFoundPageContainer";

export default async function NotFound() {
  await requireProtectedPage();

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
