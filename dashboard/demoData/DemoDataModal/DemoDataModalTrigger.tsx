import { Button } from "@/ui/Button";
import { DatabaseZap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRole } from "@/common/RoleContext";
import { useModal } from "@/common/ModalManagerContext";

export function DemoDataModalTrigger() {
  const t = useTranslations("dashboard.demoData.DemoDataModalTrigger");
  const { onOpenChange } = useModal("demoData");
  const role = useRole();

  function handlePress() {
    onOpenChange(true);
  }

  if (role !== "owner") {
    return null;
  }

  return (
    <Button
      variant="secondary"
      className="rounded-full p-3"
      iconLeft={<DatabaseZap />}
      aria-label={t("label")}
      onPress={handlePress}
    />
  );
}
