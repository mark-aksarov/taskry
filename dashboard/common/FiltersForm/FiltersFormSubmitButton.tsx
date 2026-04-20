import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "../FormBase";
import { ButtonProps } from "@/ui/Button";

export function FiltersFormSubmitButton(props: ButtonProps) {
  const t = useTranslations("dashboard.common.FiltersFormSubmitButton");

  return <FormBaseSubmitButton label={t("label")} {...props} />;
}
