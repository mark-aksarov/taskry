import { mockedCompanySummaries } from "@/mocks/companies";
import { mockedCustomerDetail } from "@/mocks/customers";

const customer = mockedCustomerDetail;

export const editCustomerFormArgs = {
  customerId: 1,
  customerFullNameDefaultValue: customer.fullName,
  customerBioDefaultValue: customer.bio,
  customerEmailDefaultValue: customer.email,
  customerPhoneNumberDefaultValue: customer.phoneNumber,
  customerPublicLinkDefaultValue: customer.publicLink,
  customerCompanyDefaultValue: "1",
  customerCompanySelectItems: mockedCompanySummaries,
  updateCustomer: () => ({ status: "success" as const }),
  mutate: () => {},
};
