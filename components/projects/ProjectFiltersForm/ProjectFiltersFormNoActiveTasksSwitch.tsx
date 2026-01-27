import { ProjectFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface ProjectFiltersFormNoActiveTasksSwitchProps {
  filters?: ProjectFilters;
}

export function ProjectFiltersFormNoActiveTasksSwitch({
  filters,
}: ProjectFiltersFormNoActiveTasksSwitchProps) {
  const t = useTranslations("projects.ProjectFiltersFormNoActiveTasksSwitch");

  return (
    <Switch
      data-test="no-active-tasks-switch"
      className="justify-between"
      name="noActiveTasks"
      defaultSelected={filters?.noActiveTasks}
    >
      {t("text")}
    </Switch>
  );
}
