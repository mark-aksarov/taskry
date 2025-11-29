import { useTranslations } from "next-intl";
import { KeyRound, Pencil, Trash } from "lucide-react";
import { NavigationButton } from "@/components/common/NavigationButton";

export function ProfileActions() {
  const t = useTranslations("users.ProfileActions");

  return (
    <div className="flex flex-col gap-2.5">
      <NavigationButton variant="secondary">
        <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("deleteAccount")}
      </NavigationButton>
      <NavigationButton variant="secondary">
        <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("changePassword")}
      </NavigationButton>
      <NavigationButton variant="secondary">
        <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("editAccount")}
      </NavigationButton>
    </div>
  );
}
