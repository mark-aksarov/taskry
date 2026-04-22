import { useTranslations } from "next-intl";
import { TextButton } from "@/common/TextButton";

export function FiltersFormResetButton({ onPress }: { onPress: () => void }) {
  const t = useTranslations("dashboard.common.FiltersFormResetButton");

  return (
    <TextButton className="shrink-1 font-semibold" onPress={onPress}>
      {t("label")}
    </TextButton>
  );
}
