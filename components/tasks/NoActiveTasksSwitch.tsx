import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface NoActiveTasksSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function NoActiveTasksSwitch({
  isSelected,
  onChange,
}: NoActiveTasksSwitchProps) {
  const t = useTranslations("tasks.NoActiveTasksSwitch");

  return (
    <Switch
      data-test="has-no-active-tasks-switch"
      className="justify-between"
      name="noActiveTasks"
      isSelected={isSelected}
      onChange={onChange}
    >
      {t("text")}
    </Switch>
  );
}
