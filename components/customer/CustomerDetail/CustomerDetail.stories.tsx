import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetail } from "./CustomerDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/CustomerDetail",
  component: CustomerDetail,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px] max-md:w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerDetail>;

export default meta;
type Story = StoryObj<typeof CustomerDetail>;

export const Default = {
  args: {
    fullName: "John Doe",
    bio: "I am a specialist who works with modern web tools and helps customers solve technical issues. I focus on clear communication, simple solutions, and steady results. I enjoy improving products, organizing workflows, and making complicated things easier for others. I always try to learn new tools, understand problems deeply, and give practical advice that actually helps.",
    email: "Oy6GK@example.com",
    phoneNumber: "+1-202-555-0147",
    publicLink: "https://company.com/customers/john",
    company: {
      name: "TechCorp",
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
