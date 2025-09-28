import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActiveTasksCard, ActiveTasksCardSkeleton } from "./ActiveTasksCard";
import { mocked } from "storybook/test";
import {
  getActiveTasks,
  getTasksDone,
  getTotalTasks,
} from "@/lib/queries/task";

const meta = {
  title: "Components/dashboard/ActiveTasksCard",
  component: ActiveTasksCard,
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
    let lastTotalTasks = 10;

    mocked(getActiveTasks).mockReturnValue(
      new Promise((res) => res(activeTasks)),
    );
    mocked(getTasksDone).mockReturnValue(new Promise((res) => res(tasksDone)));
    mocked(getTotalTasks).mockImplementation(
      () => new Promise((res) => res((lastTotalTasks += lastTotalTasks * 0.1))),
    );
  },
} satisfies Meta<typeof ActiveTasksCard>;

export default meta;
type Story = StoryObj<typeof ActiveTasksCard>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <ActiveTasksCardSkeleton />,
};
