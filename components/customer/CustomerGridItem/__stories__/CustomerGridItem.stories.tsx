import { CustomerGridItem } from "../CustomerGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerDetailModal } from "../../CustomerDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailModalStory } from "../../CustomerDetailModal/__stories__";
import { CustomerItemActionMenuTrigger } from "../../CustomerItemActionMenuTrigger";
import { CustomerItemActionMenuTriggerStory } from "../../CustomerItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/customers/CustomerGridItem",
  component: CustomerGridItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    fullName: "User 1",
    imageUrl: "/woman.jpg",
    email: "user-1@example.com",
    phoneNumber: "+1234567890",
    publicLink: "https://example.com/user-1",
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
