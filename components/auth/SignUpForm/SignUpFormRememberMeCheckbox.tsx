import { Checkbox } from "@/components/ui/Checkbox";
import { useTranslations } from "next-intl";

export function SignUpFormRememberMeCheckbox() {
  const t = useTranslations("auth.SignUpFormRememberMeCheckbox");

  return (
    <Checkbox className="font-normal" name="rememberMe">
      {t("rememberMe")}
    </Checkbox>
  );
}
