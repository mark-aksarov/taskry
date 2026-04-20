import { useCreateCustomer } from "../CreateCustomerContext";
import { useCreateCompany } from "@/dashboard/company/CreateCompanyContext";

export function useCreateCustomerButtonDisabled() {
  // Block user interactions while a company or customer is being created
  const { isPending: isCreateCompanyPending } = useCreateCompany();
  const { isPending: isCreateCustomerPending } = useCreateCustomer();

  return isCreateCustomerPending || isCreateCompanyPending;
}
