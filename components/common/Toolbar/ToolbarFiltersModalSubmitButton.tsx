import { Button, ButtonProps } from "@/components/ui";
import { useTranslations } from "next-intl";

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
