import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "./FormBase";
import { ButtonProps } from "@/components/ui/Button";

export function FiltersFormSubmitButton(props: ButtonProps) {
  const t = useTranslations("common.FiltersFormSubmitButton");

  return <FormBaseSubmitButton slot="close" label={t("label")} {...props} />;
}
