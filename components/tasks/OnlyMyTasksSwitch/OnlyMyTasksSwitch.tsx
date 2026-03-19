import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { useOnlyMyTasksSwitch } from "./OnlyMyTasksSwitchContext";

export function OnlyMyTasksSwitch() {
  const t = useTranslations("tasks.OnlyMyTasksSwitch");

  const { isSelected, updateValue } = useOnlyMyTasksSwitch();

  return (
    <Switch
      data-test="only-my-tasks"
      className="justify-between"
      name="onlyMyTasks"
      isSelected={isSelected}
      onChange={updateValue}
    >
      {t("text")}
    </Switch>
  );
}
