import { CustomersPage } from "./CustomersPage";
import { getProjects } from "@/lib/queries/project";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { CompanyCheckboxGroupContainer } from "@/components/companies/CompanyCheckboxGroup";
import { CustomerViewModeContainer } from "@/components/customer/CustomerViewModeContainer";

export default async function AppCustomersPage() {
  const projects = await getProjects();

  if (!projects) return <CustomersPageEmpty />;

  return (
    <CustomersPage
      CompanyCheckboxGroupContainer={CompanyCheckboxGroupContainer}
      CustomerViewModeContainer={CustomerViewModeContainer}
    />
  );
}
