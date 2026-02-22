import {
  useCustomerFilters,
  useCustomerFiltersDispatch,
} from "../CustomerFiltersContext";

import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

export function CustomerFiltersFormOverdueProjectsSwitch() {
  const t = useTranslations(
    "customers.CustomerFiltersFormOverdueProjectsSwitch",
  );
  const filters = useCustomerFilters();
  const dispatch = useCustomerFiltersDispatch();

  return (
    <Switch
      data-test="has-overdue-projects-switch"
      className="justify-between"
      name="hasOverdueProjects"
      isSelected={filters?.hasOverdueProjects}
      onChange={(value) =>
        dispatch({ type: "changeHasOverdueProjects", payload: value })
      }
    >
      {t("text")}
    </Switch>
  );
}
