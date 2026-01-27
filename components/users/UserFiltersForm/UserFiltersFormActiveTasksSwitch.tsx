import { UserFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface UserFiltersFormActiveTasksSwitchProps {
  filters?: UserFilters;
}

export function UserFiltersFormActiveTasksSwitch({
  filters,
}: UserFiltersFormActiveTasksSwitchProps) {
  const t = useTranslations("users.UserFiltersFormActiveTasksSwitch");

  return (
    <Switch
      data-test="has-active-tasks-switch"
      className="justify-between"
      name="hasActiveTasks"
      defaultSelected={filters?.hasActiveTasks}
    >
      {t("text")}
    </Switch>
  );
}
