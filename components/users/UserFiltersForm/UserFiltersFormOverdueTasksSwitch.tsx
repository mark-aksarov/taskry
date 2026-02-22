import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { useUserFilters, useUserFiltersDispatch } from "./UserFiltersContext";

export function UserFiltersFormOverdueTasksSwitch() {
  const t = useTranslations("users.UserFiltersFormOverdueTasksSwitch");
  const filters = useUserFilters();
  const dispatch = useUserFiltersDispatch();

  return (
    <Switch
      data-test="has-overdue-tasks-switch"
      className="justify-between"
      name="hasOverdueTasks"
      isSelected={filters?.hasOverdueTasks}
      onChange={(value) =>
        dispatch({ type: "changeHasOverdueTasks", payload: value })
      }
    >
      {t("text")}
    </Switch>
  );
}
