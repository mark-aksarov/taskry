import { Button } from "@/ui/Button";
import { useTranslations } from "next-intl";

export function AppHeaderCtaButton() {
  const t = useTranslations("site.layout.AppHeader");

  return (
    <Button
      size="medium"
      variant="accent"
      label={t("GetStartedButton.label")}
      className="rounded-xl py-2 max-md:hidden"
    />
  );
}
