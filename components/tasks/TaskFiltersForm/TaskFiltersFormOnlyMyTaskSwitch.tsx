import {
  useTaskFilters,
  useTaskFiltersDispatch,
} from "@/components/tasks/TaskFiltersContext/TaskFiltersContext";

import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

export function TaskFiltersFormOnlyMyTaskSwitch() {
  const t = useTranslations("tasks.TaskFiltersFormOnlyMyTaskSwitch");

  const filters = useTaskFilters();
  const dispatch = useTaskFiltersDispatch();

  return (
    <Switch
      data-test="show-only-my-tasks"
      className="justify-between"
      name="onlyMyTasks"
      isSelected={filters?.onlyMyTasks}
      onChange={(value) =>
        dispatch({ type: "changeOnlyMyTasks", payload: value })
      }
    >
      {t("text")}
    </Switch>
  );
}
