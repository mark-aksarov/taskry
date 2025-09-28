import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StorageLimitCard, StorageLimitCardSkeleton } from "./StorageLimitCard";

const meta = {
  title: "Components/dashboard/StorageLimitCard",
  component: StorageLimitCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StorageLimitCard>;

export default meta;
type Story = StoryObj<typeof StorageLimitCard>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <StorageLimitCardSkeleton />,
};
