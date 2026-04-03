import { mockedCustomerList } from "@/mocks/customers";
import { CustomerGridLarge } from "../CustomerGridLarge";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerGridItemLarge } from "../../CustomerGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerGridItemLargeStory } from "../../CustomerGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { MockedCustomerItemWrapper } from "../../CustomerItemWrapper/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerGridLarge",
  component: CustomerGridLarge,
  decorators: [
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGridLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomerList.map((customer) => (
      <MockedCustomerItemWrapper key={customer.id}>
        <CustomerGridItemLarge
          {...CustomerGridItemLargeStory.args}
          {...customer}
        />
      </MockedCustomerItemWrapper>
    )),
  },
} satisfies Story;
