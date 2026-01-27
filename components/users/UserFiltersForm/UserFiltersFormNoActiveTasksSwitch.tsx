import { UserFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface UserFiltersFormNoActiveTasksSwitchProps {
  filters?: UserFilters;
}

export function UserFiltersFormNoActiveTasksSwitch({
  filters,
}: UserFiltersFormNoActiveTasksSwitchProps) {
  const t = useTranslations("users.UserFiltersFormNoActiveTasksSwitch");

  return (
    <Switch
      data-test="has-no-active-tasks-switch"
      className="justify-between"
      name="hasNoActiveTasks"
      defaultSelected={filters?.hasNoActiveTasks}
    >
      {t("text")}
    </Switch>
  );
}
