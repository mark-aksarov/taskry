import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { linkStyles } from "@/components/ui/Link";

const styles = tv({
  extend: linkStyles,
  base: "block shrink-1 gap-2 truncate text-sm font-semibold",
});

export function FiltersFormResetButton({ onPress }: { onPress: () => void }) {
  const t = useTranslations("common.FiltersFormResetButton");

  return (
    <Button
      className={(renderProps) =>
        styles({ ...renderProps, variant: "primary" })
      }
      onPress={onPress}
    >
      {t("label")}
    </Button>
  );
}
