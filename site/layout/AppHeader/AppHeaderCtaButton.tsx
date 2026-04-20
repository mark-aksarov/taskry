import { Button } from "@/ui/Button";
import { useTranslations } from "next-intl";

export function AppHeaderCtaButton() {
  const t = useTranslations("site.AppHeaderCtaButton");

  return <Button size="small" value={t("label")} />;
}
