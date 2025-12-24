import { NewCustomerForm } from "../NewCustomerForm";
import { CustomerFormBaseCompanySelect } from "../CustomerFormBase";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { createCustomer } from "@/lib/actions/customer/createCustomer";

export async function NewCustomerFormServerContainer() {
  const companies = await getCompanySummaries();

  return (
    <NewCustomerForm
      companySelect={<CustomerFormBaseCompanySelect companies={companies} />}
      formAction={createCustomer}
    />
  );
}
