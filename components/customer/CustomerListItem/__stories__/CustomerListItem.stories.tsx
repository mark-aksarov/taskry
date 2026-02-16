import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "../CustomerListItem";
import { CustomerDetailModal } from "../../CustomerDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailModalStory } from "../../CustomerDetailModal/__stories__";
import { CustomerItemActionMenuTrigger } from "../../CustomerItemActionMenuTrigger";
import { withDeleteCustomerModalProvider } from "../../DeleteCustomerModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { CustomerItemActionMenuTriggerStory } from "../../CustomerItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/customers/CustomerListItem",
  component: CustomerListItem,
  decorators: [
    withSelectedItemsProvider,
    withDeleteCustomerModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    fullName: "Customer 1",
    imageUrl: "/woman.jpg",
    email: "customer-1@example.com",
    phoneNumber: "+1234567890",
    publicLink: "https://example.com/customer-1",
    company: {
      id: 1,
      name: "Company 1",
    },
    menuTrigger: (
      <CustomerItemActionMenuTrigger
        {...CustomerItemActionMenuTriggerStory.args}
      />
    ),

    customerDetailModal: (
      <CustomerDetailModal {...CustomerDetailModalStory.args} />
    ),
  },
} satisfies Story;

export const WithoutImagePhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
    company: undefined,
  },
} satisfies Story;
