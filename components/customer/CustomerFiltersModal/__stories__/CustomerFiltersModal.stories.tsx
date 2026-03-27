import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerFiltersForm } from "../../CustomerFiltersForm";
import { CustomerFiltersModal } from "../CustomerFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { useCustomerFiltersModal } from "../CustomerFiltersModalContext";
import { withCustomerFiltersModalProvider } from "./withCustomerFiltersModalProvider";
import { withCustomerFiltersProvider } from "../../CustomerFiltersContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerFiltersModal",
  component: CustomerFiltersModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCustomerFiltersModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Story />
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
        </>
      );
    },
    withCustomerFiltersModalProvider,
    withCustomerFiltersProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <CustomerFiltersForm companyCheckboxGroupItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;
