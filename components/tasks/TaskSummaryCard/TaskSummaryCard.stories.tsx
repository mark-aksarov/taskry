import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskSummaryCard, TaskSummaryCardSkeleton } from "./TaskSummaryCard";
import { mocked } from "storybook/internal/test";
import { getTask } from "@/lib/queries/task";
import { tasksMock } from "@/lib/data/__mocks__/tasks";

const meta = {
  title: "Components/tasks/TaskSummaryCard",
  component: TaskSummaryCard,
  tags: ["autodocs"],
  args: {
    id: 1,
  },
  beforeEach: () => {
    mocked(getTask).mockReturnValue(new Promise((res) => res(tasksMock[0])));
  },
} satisfies Meta<typeof TaskSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;

export const Skeleton: Story = {
  render: () => <TaskSummaryCardSkeleton />,
};

export const MobileSkeleton = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
  render: () => <TaskSummaryCardSkeleton />,
};
