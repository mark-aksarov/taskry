import { Link } from "@/ui/Link";
import { useTranslations } from "next-intl";

export function ImportModalDocsLink({ href }: { href: string }) {
  const t = useTranslations("dashboard.common.ImportModalDocsLink");

  return (
    <Link variant="primary" href={href} className="mb-2 font-semibold">
      {t("label")}
    </Link>
  );
}
