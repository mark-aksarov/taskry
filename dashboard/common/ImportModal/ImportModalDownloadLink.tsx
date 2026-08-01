import { Link } from "@/ui/Link";
import { useTranslations } from "next-intl";

export function ImportModalDownloadLink() {
  const t = useTranslations("dashboard.common.ImportModalDownloadLink");

  return (
    <Link
      variant="primary"
      href="/csv-examples.zip"
      className="font-semibold"
      download
    >
      {t("label")}
    </Link>
  );
}
