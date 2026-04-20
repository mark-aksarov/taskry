import { useTranslations } from "next-intl";
import { Switch } from "@/ui/Switch";

interface ActiveTasksSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function OverdueTasksSwitch({
  isSelected,
  onChange,
}: ActiveTasksSwitchProps) {
  const t = useTranslations("dashboard.tasks.OverdueTasksSwitch");

  return (
    <Switch
      data-test="has-overdue-tasks-switch"
      className="justify-between"
      name="hasOverdueTasks"
      isSelected={isSelected}
      onChange={onChange}
    >
      {t("text")}
    </Switch>
  );
}
