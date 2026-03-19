import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DialogTrigger } from "react-aria-components";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CompanyFiltersForm } from "../CompanyFiltersForm";
import { CompanyFiltersModal } from "./CompanyFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/companies/CompanyFiltersModal",
  component: CompanyFiltersModal,
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
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CompanyFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <CompanyFiltersForm companyCheckboxGroupItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;
