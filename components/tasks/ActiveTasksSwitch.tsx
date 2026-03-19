import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface ActiveTasksSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function ActiveTasksSwitch({
  isSelected,
  onChange,
}: ActiveTasksSwitchProps) {
  const t = useTranslations("tasks.ActiveTasksSwitch");

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
