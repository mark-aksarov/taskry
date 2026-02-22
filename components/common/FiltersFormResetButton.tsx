import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function FiltersFormResetButton({ onPress }: { onPress?: () => void }) {
  const t = useTranslations("common.FiltersResetButton");

  return (
    <Button
      variant="outlined"
      label={t("label")}
      size="medium"
      className="w-full justify-center px-0"
      onPress={onPress}
    />
  );
}
