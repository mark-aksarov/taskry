import { Decorator } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { SearchList } from "@/components/search/SearchList";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { CreateCustomerForm } from "@/components/customer/CreateCustomerForm";
import { CreateCompanyModal } from "@/components/company/CreateCompanyModal";
import { CreateCustomerModal } from "@/components/customer/CreateCustomerModal";
import { CustomerSearchModal } from "@/components/customer/CustomerSearchModal";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { CustomerFiltersModal } from "@/components/customer/CustomerFiltersModal";
import { CustomerCompanyFiltersForm } from "@/components/customer/CustomerCompanyFiltersForm";
import { CustomerCompanyFiltersModal } from "@/components/customer/CustomerCompanyFiltersModal";

export const withCustomersPageModals: Decorator = (Story) => {
  return (
    <>
      <Story />

      <CustomerSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
      <CreateCustomerModal
        createCustomerFormContainer={
          <CreateCustomerForm companySelectItems={mockedCompanySummaries} />
        }
      />
      <CreateCompanyModal />
      <CustomerFiltersModal
        filtersFormContainer={
          <CustomerFiltersForm
            companyCheckboxGroupItems={mockedCompanySummaries}
          />
        }
      />
      <CustomerCompanyFiltersModal
        filtersFormContainer={
          <CustomerCompanyFiltersForm
            companyCheckboxGroupItems={mockedCompanySummaries}
          />
        }
      />
    </>
  );
};
