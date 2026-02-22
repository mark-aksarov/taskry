import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFiltersForm } from "../CustomerFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCustomerFiltersProvider } from "../../CustomerFiltersContext/__stories__";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { CustomerFiltersFormCompanyCheckboxGroup } from "../../CustomerFiltersFormCompanyCheckboxGroup";
import { CustomerFiltersFormCompanyCheckboxGroupStory } from "../../CustomerFiltersFormCompanyCheckboxGroup/__stories__";

const meta: Meta<typeof CustomerFiltersForm> = {
  title: "components/customers/CustomerFiltersForm",
  component: CustomerFiltersForm,
  decorators: [
    withPageTransitionProvider,
    withOverlayTriggerStateProvider,
    withCustomerFiltersProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerFiltersForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyCheckboxGroup: (
      <CustomerFiltersFormCompanyCheckboxGroup
        {...CustomerFiltersFormCompanyCheckboxGroupStory.args}
      />
    ),
  },
} satisfies Story;
