import { CustomerFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface CustomerFiltersFormOverdueProjectsSwitchProps {
  filters?: CustomerFilters;
}

export function CustomerFiltersFormOverdueProjectsSwitch({
  filters,
}: CustomerFiltersFormOverdueProjectsSwitchProps) {
  const t = useTranslations(
    "customers.CustomerFiltersFormOverdueProjectsSwitch",
  );

  return (
    <Switch
      data-test="has-overdue-projects-switch"
      className="justify-between"
      name="hasOverdueProjects"
      defaultSelected={filters?.hasOverdueProjects}
    >
      {t("text")}
    </Switch>
  );
}
