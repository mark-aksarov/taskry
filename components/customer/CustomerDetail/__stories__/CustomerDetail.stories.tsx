import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetail } from "../CustomerDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/CustomerDetail",
  component: CustomerDetail,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    fullName: "User 1",
    bio: "Sample bio text. Placeholder content only. No specific details provided.",
    email: "user1@example.com",
    phoneNumber: "+10000000001",
    publicLink: "https://example.com/user1",
    company: {
      name: "Company 1",
    },
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    bio: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
    company: undefined,
  },
} satisfies Story;
