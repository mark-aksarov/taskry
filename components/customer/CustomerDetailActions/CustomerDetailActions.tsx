import { useTranslations } from "next-intl";
import { KeyRound, Pencil, Trash } from "lucide-react";
import { NavigationButton } from "@/components/common/NavigationButton";

export function CustomerDetailActions() {
  const t = useTranslations("customers.CustomerDetailActions");

  return (
    <div className="flex flex-col gap-2.5">
      <NavigationButton variant="secondary">
        <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("delete")}
      </NavigationButton>
      <NavigationButton variant="secondary">
        <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("edit")}
      </NavigationButton>
    </div>
  );
}
