import {
  useCustomerFilters,
  useCustomerFiltersDispatch,
} from "../CustomerFiltersContext";

import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

export function CustomerFiltersFormNoActiveProjectsSwitch() {
  const t = useTranslations(
    "customers.CustomerFiltersFormNoActiveProjectsSwitch",
  );
  const filters = useCustomerFilters();
  const dispatch = useCustomerFiltersDispatch();

  return (
    <Switch
      data-test="has-no-active-projects-switch"
      className="justify-between"
      name="hasNoActiveProjects"
      isSelected={filters?.hasNoActiveProjects}
      onChange={(value) =>
        dispatch({ type: "changeHasNoActiveProjects", payload: value })
      }
    >
      {t("text")}
    </Switch>
  );
}
