import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCheckboxGroupSkeleton } from "./CustomerCheckboxGroupSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/CustomerCheckboxGroupSkeleton",
  component: CustomerCheckboxGroupSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerCheckboxGroupSkeleton>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};
