import { useCreateCompany } from "@/dashboard/company/CreateCompanyContext";

export function useCreateCompanyTriggerDisabled() {
  // Create company action and modal states
  const { isPending: isCreateCompanyPending } = useCreateCompany();

  return isCreateCompanyPending;
}
