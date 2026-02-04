import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function ResetPasswordFormSubmitButton() {
  const t = useTranslations("auth.ResetPasswordFormSubmitButton");

  return (
    <Button
      type="submit"
      size="medium"
      label={t("label")}
      className="justify-center py-4"
    />
  );
}
