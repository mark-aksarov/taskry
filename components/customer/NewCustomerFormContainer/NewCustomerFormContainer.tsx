import { NewCustomerForm } from "../NewCustomerForm";
import { CustomerFormBaseCompanySelect } from "../CustomerFormBase";
import { createCustomer } from "@/lib/actions/customer/createCustomer";
import { getCompanySummaries } from "@/lib/data/company/company.service";

export async function NewCustomerFormContainer() {
  const companies = await getCompanySummaries();

  return (
    <NewCustomerForm
      companySelect={<CustomerFormBaseCompanySelect companies={companies} />}
      formAction={createCustomer}
    />
  );
}
