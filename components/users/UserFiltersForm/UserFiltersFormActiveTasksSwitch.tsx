import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { useUserFilters, useUserFiltersDispatch } from "./UserFiltersContext";

export function UserFiltersFormActiveTasksSwitch() {
  const t = useTranslations("users.UserFiltersFormActiveTasksSwitch");
  const filters = useUserFilters();
  const dispatch = useUserFiltersDispatch();

  return (
    <Switch
      data-test="has-active-tasks-switch"
      className="justify-between"
      name="hasActiveTasks"
      isSelected={filters?.hasActiveTasks}
      onChange={(value) =>
        dispatch({ type: "changeHasActiveTasks", payload: value })
      }
    >
      {t("text")}
    </Switch>
  );
}
