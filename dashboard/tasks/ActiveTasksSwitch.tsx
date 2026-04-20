import { useTranslations } from "next-intl";
import { Switch } from "@/ui/Switch";

interface ActiveTasksSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function ActiveTasksSwitch({
  isSelected,
  onChange,
}: ActiveTasksSwitchProps) {
  const t = useTranslations("dashboard.tasks.ActiveTasksSwitch");

  return (
    <Switch
      data-test="has-active-tasks-switch"
      className="justify-between"
      name="hasActiveTasks"
      isSelected={isSelected}
      onChange={onChange}
    >
      {t("text")}
    </Switch>
  );
}
