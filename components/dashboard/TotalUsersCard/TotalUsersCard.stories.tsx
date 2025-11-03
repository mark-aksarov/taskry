import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mocked } from "storybook/test";
import { TotalUsersCard, TotalUsersCardSkeleton } from "./TotalUsersCard";
import { getTotalUsers } from "@/lib/queries/user";

const meta = {
  title: "Components/dashboard/TotalUsersCard",
  component: TotalUsersCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  beforeEach: () => {
    mocked(getTotalUsers).mockImplementation(
      () => new Promise((res) => res(20)),
    );
  },
} satisfies Meta<typeof TotalUsersCard>;

export default meta;
type Story = StoryObj<typeof TotalUsersCard>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <TotalUsersCardSkeleton />,
};
