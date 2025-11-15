import { CustomersPage } from "./CustomersPage";
import { getProjects } from "@/lib/queries/project";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { CustomerViewModeContainer } from "@/components/customer/CustomerViewModeContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersForm";

export default async function AppCustomersPage() {
  const projects = await getProjects();

  if (!projects) return <CustomersPageEmpty />;

  return (
    <CustomersPage
      CustomerFiltersFormContainer={CustomerFiltersFormContainer}
      CustomerViewModeContainer={CustomerViewModeContainer}
    />
  );
}
