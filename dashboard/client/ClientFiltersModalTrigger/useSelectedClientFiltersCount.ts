import { useClientFilters } from "../ClientFiltersContext";

export function useSelectedClientFiltersCount() {
  const initialFilters = useClientFilters();

  const selectedCount =
    (initialFilters.companyIds?.length ?? 0) +
    (initialFilters.hasNoActiveProjects ? 1 : 0) +
    (initialFilters.hasActiveProjects ? 1 : 0) +
    (initialFilters.hasOverdueProjects ? 1 : 0);

  return selectedCount;
}
