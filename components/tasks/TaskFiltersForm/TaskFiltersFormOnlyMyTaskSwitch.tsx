import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface TaskFiltersFormOnlyMyTaskSwitchProps {
  filters?: TaskFilters;
}

export function TaskFiltersFormOnlyMyTaskSwitch({
  filters,
}: TaskFiltersFormOnlyMyTaskSwitchProps) {
  const t = useTranslations("tasks.TaskFiltersFormOnlyMyTaskSwitch");

  return (
    <Switch
      data-test="show-only-my-tasks"
      className="justify-between"
      name="onlyMyTasks"
      defaultSelected={filters?.onlyMyTasks}
    >
      {t("text")}
    </Switch>
  );
}
