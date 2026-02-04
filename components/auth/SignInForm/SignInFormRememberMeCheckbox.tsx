import { Checkbox } from "@/components/ui/Checkbox";
import { useTranslations } from "next-intl";

export function SignInFormRememberMeCheckbox() {
  const t = useTranslations("auth.SignInFormRememberMeCheckbox");

  return (
    <Checkbox className="font-normal" name="rememberMe">
      {t("rememberMe")}
    </Checkbox>
  );
}
