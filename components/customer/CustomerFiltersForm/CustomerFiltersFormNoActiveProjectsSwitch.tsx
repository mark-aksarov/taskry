import { CustomerFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface CustomerFiltersFormNoActiveProjectsSwitchProps {
  filters?: CustomerFilters;
}

export function CustomerFiltersFormNoActiveProjectsSwitch({
  filters,
}: CustomerFiltersFormNoActiveProjectsSwitchProps) {
  const t = useTranslations(
    "customers.CustomerFiltersFormNoActiveProjectsSwitch",
  );

  return (
    <Switch
      data-test="has-no-active-projects-switch"
      className="justify-between"
      name="hasNoActiveProjects"
      defaultSelected={filters?.hasNoActiveProjects}
    >
      {t("text")}
    </Switch>
  );
}
