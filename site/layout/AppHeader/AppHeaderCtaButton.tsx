import { Button } from "@/ui/Button";
import { useTranslations } from "next-intl";

export function AppHeaderCtaButton() {
  const t = useTranslations("site.CtaButton");

  return <Button size="medium" label={t("label")} className="py-2" />;
}
