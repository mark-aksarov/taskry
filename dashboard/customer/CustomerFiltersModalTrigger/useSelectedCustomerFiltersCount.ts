import { useCustomerFilters } from "../CustomerFiltersContext";

export function useSelectedCustomerFiltersCount() {
  const initialFilters = useCustomerFilters();

  const selectedCount =
    (initialFilters.companyIds?.length ?? 0) +
    (initialFilters.hasNoActiveProjects ? 1 : 0) +
    (initialFilters.hasActiveProjects ? 1 : 0) +
    (initialFilters.hasOverdueProjects ? 1 : 0);

  return selectedCount;
}
