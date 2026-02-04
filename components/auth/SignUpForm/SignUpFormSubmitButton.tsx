import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function SignUpFormSubmitButton() {
  const t = useTranslations("auth.SignUpFormSubmitButton");

  return (
    <Button
      type="submit"
      size="medium"
      label={t("label")}
      className="justify-center py-4"
    />
  );
}
