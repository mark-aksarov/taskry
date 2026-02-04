import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function SignInFormSubmitButton() {
  const t = useTranslations("auth.SignInFormSubmitButton");

  return (
    <Button
      type="submit"
      size="medium"
      label={t("label")}
      className="justify-center py-4"
    />
  );
}
