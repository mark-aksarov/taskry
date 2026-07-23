import { useCreateClient } from "../CreateClientContext";
import { useCreateCompany } from "@/dashboard/company/CreateCompanyContext";

export function useCreateClientButtonDisabled() {
  // Block user interactions while a company or client is being created
  const { isPending: isCreateCompanyPending } = useCreateCompany();
  const { isPending: isCreateClientPending } = useCreateClient();

  return isCreateClientPending || isCreateCompanyPending;
}
