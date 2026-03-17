import { useCreateCompany } from "@/components/company/CreateCompanyContext";

export function useCreateCompanyTriggerDisabled() {
  // Create company action and modal states
  const { isPending: isCreateCompanyPending } = useCreateCompany();

  return isCreateCompanyPending;
}
