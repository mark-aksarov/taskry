import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DialogTrigger } from "react-aria-components";
import { mockedCompanySummaries } from "@/mocks/companies";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerCompanyFiltersForm } from "../CustomerCompanyFiltersForm";
import { CustomerCompanyFiltersModal } from "./CustomerCompanyFiltersModal";
import { withCustomerFiltersProvider } from "../CustomerFiltersContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerCompanyFiltersModal",
  component: CustomerCompanyFiltersModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Open modal" />
          <Story />
        </DialogTrigger>
      );
    },
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
