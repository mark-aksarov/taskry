import { CustomerGrid } from "../CustomerGrid";
import type { Meta, StoryObj } from "@storybook/react";
import { mockedCustomerList } from "@/mocks/customers";
import { CustomerGridItem } from "../../CustomerGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerGridItemStory } from "../../CustomerGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteCustomerModalProvider } from "../../DeleteCustomerModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerGrid",
  component: CustomerGrid,
  decorators: [
    withViewModeProvider,
    withPageTransitionProvider,
    withSelectedItemsProvider,
    withDeleteCustomerModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomerList.map((customer) => (
      <CustomerGridItem
        key={customer.id}
        {...CustomerGridItemStory.args}
        {...customer}
      />
    )),
  },
} satisfies Story;
