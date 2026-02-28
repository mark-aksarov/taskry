import { CustomerList } from "../CustomerList";
import { mockedCustomerList } from "@/mocks/customers";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "../../CustomerListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerListItemStory } from "../../CustomerListItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerList",
  component: CustomerList,
  decorators: [
    withViewModeProvider,
    withPageTransitionProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomerList.map((customer) => (
      <CustomerListItem
        key={customer.id}
        {...CustomerListItemStory.args}
        {...customer}
      />
    )),
  },
} satisfies Story;
