import { Button, ButtonProps } from "@/components/ui";
import { useTranslations } from "next-intl";

export function ToolbarFiltersModalSubmitButton(props: ButtonProps) {
  const t = useTranslations("common.Toolbar.ToolbarFiltersModalTrigger");

  return (
    <Button
      slot="close"
      type="submit"
      variant="primary"
      size="medium"
      label={t("applyButtonLabel")}
      className="w-full justify-center"
      {...props}
    />
  );
}
