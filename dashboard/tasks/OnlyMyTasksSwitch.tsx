import { useTranslations } from "next-intl";
import { Switch } from "@/ui/Switch";

interface OnlyMyTasksSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function OnlyMyTasksSwitch({
  isSelected,
  onChange,
}: OnlyMyTasksSwitchProps) {
  const t = useTranslations("dashboard.tasks.OnlyMyTasksSwitch");

  return (
    <Switch
      data-test="only-my-tasks"
      className="justify-between"
      name="onlyMyTasks"
      isSelected={isSelected}
      onChange={onChange}
    >
      {t("text")}
    </Switch>
  );
}
