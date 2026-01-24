import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";

export function ToolbarFiltersModalSubmitButton(props: ButtonProps) {
  const t = useTranslations("common.ToolbarFiltersModalSubmitButton");

  return (
    <Button
      slot="close"
      type="submit"
      variant="primary"
      size="medium"
      label={t("label")}
      className="w-full justify-center"
      {...props}
    />
  );
}
