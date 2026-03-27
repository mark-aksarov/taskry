import { CreateCompanyModal } from "@/components/company/CreateCompanyModal";
import { CreateCustomerModal } from "@/components/customer/CreateCustomerModal";
import { CustomerSearchModal } from "@/components/customer/CustomerSearchModal";
import { CustomerFiltersModal } from "@/components/customer/CustomerFiltersModal";
import { CustomerCompanyFiltersModal } from "@/components/customer/CustomerCompanyFiltersModal";
import { CreateCustomerFormContainer } from "@/components/customer/CreateCustomerFormContainer";
import { CustomerFiltersFormContainer } from "@/components/customer/CustomerFiltersFormContainer";
import { CustomerRouterSearchContainer } from "@/components/customer/CustomerRouterSearchContainer";
import { CustomerCompanyFiltersFormContainer } from "@/components/customer/CustomerCompanyFiltersFormContainer";

export function CustomerPageModals() {
  return (
    <>
      <CustomerSearchModal
        searchContainer={<CustomerRouterSearchContainer />}
      />
      <CreateCustomerModal
        createCustomerFormContainer={<CreateCustomerFormContainer />}
      />
      <CreateCompanyModal />
      <CustomerFiltersModal
        filtersFormContainer={<CustomerFiltersFormContainer />}
      />
      <CustomerCompanyFiltersModal
        filtersFormContainer={<CustomerCompanyFiltersFormContainer />}
      />
    </>
  );
}
