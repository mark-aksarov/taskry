import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { useUserFilters, useUserFiltersDispatch } from "./UserFiltersContext";

export function UserFiltersFormNoActiveTasksSwitch() {
  const t = useTranslations("users.UserFiltersFormNoActiveTasksSwitch");
  const filters = useUserFilters();
  const dispatch = useUserFiltersDispatch();

  return (
    <Switch
      data-test="has-no-active-tasks-switch"
      className="justify-between"
      name="hasNoActiveTasks"
      isSelected={filters?.hasNoActiveTasks}
      onChange={(value) =>
        dispatch({ type: "changeHasNoActiveTasks", payload: value })
      }
    >
      {t("text")}
    </Switch>
  );
}
