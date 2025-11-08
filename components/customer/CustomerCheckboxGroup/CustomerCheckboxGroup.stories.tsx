import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCheckboxGroup } from "./CustomerCheckboxGroup";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/customers/CustomerCheckboxGroup",
  component: CustomerCheckboxGroup,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof CustomerCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customers: [
      {
        id: 1,
        fullName: "Alice Johnson",
      },
      {
        id: 2,
        fullName: "Bob Smith",
      },
      {
        id: 3,
        fullName: "Clara Davis",
      },
      {
        id: 4,
        fullName: "David Lee",
      },
      {
        id: 5,
        fullName: "Emma Wilson",
      },
    ],
  },
} satisfies Story;
