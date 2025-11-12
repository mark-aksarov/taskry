import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerGridItem } from "./CustomerGridItem";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/customers/CustomerGridItem",
  component: CustomerGridItem,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
} satisfies Meta<typeof CustomerGridItem>;

export default meta;
type Story = StoryObj<typeof CustomerGridItem>;

export const Default = {
  args: {
    customer: {
      id: 1,
      fullName: "Sophia Turner",
      imageUrl: "/woman.jpg",
      email: "sophia.turner@example.com",
      phoneNumber: "+1-202-555-0101",
      publicLink: "https://company.com/customers/sophia",
      company: {
        id: 1,
        name: "TechCorp",
      },
    },
  },
} satisfies Story;

export const WithoutImagePhoneAndLink: Story = {
  args: {
    customer: {
      ...Default.args.customer,
      imageUrl: null,
      phoneNumber: null,
      publicLink: null,
    },
  },
} satisfies Story;

export const Skeleton: Story = {
  args: {
    customer: undefined,
  },
} satisfies Story;
