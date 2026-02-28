import { useDeleteCompanies } from "../DeleteCompaniesContext";
import { useDeleteCompanyTransition } from "../DeleteCompanyTransitionContext";
import { useUpdateCompanyTransition } from "../UpdateCompanyTransitionContext";

export function useCompanyListItemPending(companyId: number) {
  const { isPending: isDeleteCompanyPending } = useDeleteCompanyTransition();
  const { isPending: isUpdateCompanyPending } = useUpdateCompanyTransition();
  const { isPending: isDeleteCompaniesPending, companyIds } =
    useDeleteCompanies();

  const isPending =
    isDeleteCompanyPending ||
    isUpdateCompanyPending ||
    (isDeleteCompaniesPending && companyIds.includes(companyId));

  return isPending;
}
