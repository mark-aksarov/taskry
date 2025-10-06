import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mocked } from "storybook/internal/test";
import { StorageLimitCard, StorageLimitCardSkeleton } from "./StorageLimitCard";
import { getStorageUsage } from "@/lib/queries/storage";

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
  beforeEach: () => {
    mocked(getStorageUsage).mockReturnValue(
      new Promise((res) =>
        res({
          limit: 1000,
          used: 500,
        }),
      ),
    );
  },
} satisfies Meta<typeof StorageLimitCard>;

export default meta;
type Story = StoryObj<typeof StorageLimitCard>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <StorageLimitCardSkeleton />,
};
