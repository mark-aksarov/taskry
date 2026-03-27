import { type Decorator } from "@storybook/react";
import { CreateCompanyModalProvider } from "@/components/company/CreateCompanyModal";
import { MockedSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { MockedCreateCompanyProvider } from "@/components/company/CreateCompanyProvider/__stories__";
import { MockedDeleteCompaniesProvider } from "@/components/company/DeleteCompaniesProvider/__stories__";

export const withCompaniesPageProvider: Decorator = (Story) => {
  return (
    <MockedSelectedItemsProvider>
      <MockedDeleteCompaniesProvider>
        <CreateCompanyModalProvider>
          <MockedCreateCompanyProvider>
            <Story />
          </MockedCreateCompanyProvider>
        </CreateCompanyModalProvider>
      </MockedDeleteCompaniesProvider>
    </MockedSelectedItemsProvider>
  );
};
