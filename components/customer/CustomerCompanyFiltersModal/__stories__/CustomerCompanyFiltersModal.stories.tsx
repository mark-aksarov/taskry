import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { mockedCompanySummaries } from "@/mocks/companies";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerCompanyFiltersModal } from "../CustomerCompanyFiltersModal";
import { CustomerCompanyFiltersForm } from "../../CustomerCompanyFiltersForm";
import { useCustomerCompanyFiltersModal } from "../CustomerCompanyFiltersModalContext";
import { withCustomerFiltersProvider } from "../../CustomerFiltersContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCustomerCompanyFiltersModalProvider } from "./withCustomerCompanyFiltersModalProvider";

const meta = {
  title: "components/customers/CustomerCompanyFiltersModal",
  component: CustomerCompanyFiltersModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCustomerCompanyFiltersModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Story />
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
        </>
      );
    },
    withCustomerCompanyFiltersModalProvider,
    withCustomerFiltersProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerCompanyFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <CustomerCompanyFiltersForm
        companyCheckboxGroupItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;
