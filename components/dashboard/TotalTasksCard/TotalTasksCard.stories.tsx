import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mocked } from "storybook/test";
import { TotalTasksCard, TotalTasksCardSkeleton } from "./TotalTasksCard";
import { getTotalTasks } from "@/lib/queries/task";

const meta = {
  title: "Components/dashboard/TotalTasksCard",
  component: TotalTasksCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  beforeEach: () => {
    mocked(getTotalTasks).mockImplementation(
      () => new Promise((res) => res(100)),
    );
  },
} satisfies Meta<typeof TotalTasksCard>;

export default meta;
type Story = StoryObj<typeof TotalTasksCard>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <TotalTasksCardSkeleton />,
};
