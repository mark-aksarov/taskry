import { Checkbox } from "@/ui/Checkbox";
import { useTranslations } from "next-intl";

export function RememberMeCheckbox() {
  const t = useTranslations("auth.RememberMeCheckbox");

  return (
    <Checkbox className="font-normal" name="rememberMe">
      {t("rememberMe")}
    </Checkbox>
  );
}
