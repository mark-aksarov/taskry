import { useTranslations } from "next-intl";
import NotFoundSection from "@/common/NotFoundSection";

export default function NotFound() {
  const t = useTranslations("app.NotFound");

  return (
    <div className="flex h-dvh items-center justify-center">
      <NotFoundSection
        linkLabel={t("toHome")}
        linkHref="/"
        heading={t("heading")}
        description={t("description")}
      />
    </div>
  );
}
