import { useDeleteCompanies } from "../DeleteCompaniesContext";
import { useDeleteCompany } from "../DeleteCompanyContext";
import { useUpdateCompany } from "../UpdateCompanyContext";

export function useCompanyListItemPending(companyId: number) {
  const { isPending: isDeleteCompanyPending } = useDeleteCompany();
  const { isPending: isUpdateCompanyPending } = useUpdateCompany();
  const { isPending: isDeleteCompaniesPending, ids: companyIds } =
    useDeleteCompanies();

  const isPending =
    isDeleteCompanyPending ||
    isUpdateCompanyPending ||
    (isDeleteCompaniesPending && companyIds.includes(companyId));

  return isPending;
}
