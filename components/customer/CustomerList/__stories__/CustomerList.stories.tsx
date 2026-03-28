import { CustomerList } from "../CustomerList";
import { mockedCustomerList } from "@/mocks/customers";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "../../CustomerListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerListItemStory } from "../../CustomerListItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { MockedCustomerItemWrapper } from "../../CustomerItemWrapper/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/customers/CustomerList",
  component: CustomerList,
  decorators: [
    withDeleteCustomersProvider,
    withViewModeProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomerList.map((customer) => (
      <MockedCustomerItemWrapper key={customer.id}>
        <CustomerListItem {...CustomerListItemStory.args} {...customer} />
      </MockedCustomerItemWrapper>
    )),
  },
} satisfies Story;
