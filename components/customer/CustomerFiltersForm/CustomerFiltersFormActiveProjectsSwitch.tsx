import {
  useCustomerFilters,
  useCustomerFiltersDispatch,
} from "../CustomerFiltersContext";

import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

export function CustomerFiltersFormActiveProjectsSwitch() {
  const t = useTranslations(
    "customers.CustomerFiltersFormActiveProjectsSwitch",
  );
  const filters = useCustomerFilters();
  const dispatch = useCustomerFiltersDispatch();

  return (
    <Switch
      data-test="has-active-projects-switch"
      className="justify-between"
      name="hasActiveProjects"
      isSelected={filters?.hasActiveProjects}
      onChange={(value) =>
        dispatch({ type: "changeHasActiveProjects", payload: value })
      }
    >
      {t("text")}
    </Switch>
  );
}
