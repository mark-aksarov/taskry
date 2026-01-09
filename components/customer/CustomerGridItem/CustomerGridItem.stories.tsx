import { fn } from "storybook/test";
import { CustomerGridItem } from "./CustomerGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";

const meta = {
  title: "Components/customers/CustomerGridItem",
  component: CustomerGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-full md:w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  render: (args) => (
    <CustomerGridItem {...args} menuTrigger={renderMenu(args)} />
  ),
} satisfies Meta<typeof CustomerGridItem>;

export default meta;
type Story = StoryObj<typeof CustomerGridItem>;

const renderMenu = (args: any) => (
  <CustomerItemActionMenuTrigger
    customerId={args.id}
    customerFullName={args.fullName}
    deleteAction={fn()}
    className="-mr-2"
  />
);

export const Default = {
  args: {
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
} satisfies Story;

export const WithoutImagePhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;
