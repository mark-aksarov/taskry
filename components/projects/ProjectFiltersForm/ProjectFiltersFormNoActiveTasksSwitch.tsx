import {
  useProjectFilters,
  useProjectFiltersDispatch,
} from "../ProjectFiltersContext";

import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

export function ProjectFiltersFormNoActiveTasksSwitch() {
  const t = useTranslations("projects.ProjectFiltersFormNoActiveTasksSwitch");
  const filters = useProjectFilters();
  const dispatch = useProjectFiltersDispatch();

  return (
    <Switch
      data-test="no-active-tasks-switch"
      className="justify-between"
      name="noActiveTasks"
      isSelected={filters?.noActiveTasks}
      onChange={(value) =>
        dispatch({ type: "changeNoActiveTasks", payload: value })
      }
    >
      {t("text")}
    </Switch>
  );
}
