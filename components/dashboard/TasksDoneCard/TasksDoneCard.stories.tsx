import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TasksDoneCard, TasksDoneCardSkeleton } from "./TasksDoneCard";
import { mocked } from "storybook/test";
import { getActiveTasks, getTasksDone } from "@/lib/queries/task";

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
  beforeEach: () => {
    const activeTasks = 25;
    const tasksDone = 15;

    mocked(getActiveTasks).mockReturnValue(
      new Promise((res) => res(activeTasks)),
    );
    mocked(getTasksDone).mockReturnValue(new Promise((res) => res(tasksDone)));
  },
} satisfies Meta<typeof TasksDoneCard>;

export default meta;
type Story = StoryObj<typeof TasksDoneCard>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <TasksDoneCardSkeleton />,
};
