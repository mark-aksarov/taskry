import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerGridItem } from "./CustomerGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/CustomerGridItem",
  component: CustomerGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGridItem>;

export default meta;
type Story = StoryObj<typeof CustomerGridItem>;

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
