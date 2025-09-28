import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TasksDoneCard, TasksDoneCardSkeleton } from "./TasksDoneCard";

const meta = {
  title: "Components/dashboard/TasksDoneCard",
  component: TasksDoneCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TasksDoneCard>;

export default meta;
type Story = StoryObj<typeof TasksDoneCard>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <TasksDoneCardSkeleton />,
};
