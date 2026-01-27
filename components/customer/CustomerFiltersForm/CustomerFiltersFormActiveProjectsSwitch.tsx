import { CustomerFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface CustomerFiltersFormActiveProjectsSwitchProps {
  filters?: CustomerFilters;
}

export function CustomerFiltersFormActiveProjectsSwitch({
  filters,
}: CustomerFiltersFormActiveProjectsSwitchProps) {
  const t = useTranslations(
    "customers.CustomerFiltersFormActiveProjectsSwitch",
  );

  return (
    <Switch
      data-test="has-active-projects-switch"
      className="justify-between"
      name="hasActiveProjects"
      defaultSelected={filters?.hasActiveProjects}
    >
      {t("text")}
    </Switch>
  );
}
