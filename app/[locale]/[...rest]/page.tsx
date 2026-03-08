import NotFoundPageContainer from "@/components/layout/NotFoundPageContainer";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("app.DashboardNotFoundPage");

  return (
    <NotFoundPageContainer
      heading={t("heading")}
      description={t("description")}
      linkHref="/"
      linkLabel={t("toHome")}
      emptySectionClassName="max-w-[500px]"
    />
  );
}
