import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function ForgetPasswordFormSubmitButton() {
  const t = useTranslations("auth.ForgetPasswordFormSubmitButton");

  return (
    <Button
      type="submit"
      size="medium"
      label={t("label")}
      className="justify-center py-4"
    />
  );
}
