import { UserFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface UserFiltersFormOverdueTasksSwitchProps {
  filters?: UserFilters;
}

export function UserFiltersFormOverdueTasksSwitch({
  filters,
}: UserFiltersFormOverdueTasksSwitchProps) {
  const t = useTranslations("users.UserFiltersFormOverdueTasksSwitch");

  return (
    <Switch
      data-test="has-overdue-tasks-switch"
      className="justify-between"
      name="hasOverdueTasks"
      defaultSelected={filters?.hasOverdueTasks}
    >
      {t("text")}
    </Switch>
  );
}
