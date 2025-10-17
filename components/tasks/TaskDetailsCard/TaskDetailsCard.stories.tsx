import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailsCard } from "./TaskDetailsCard";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { TaskDetailsCardSkeleton } from "./TaskDetailsCardSkeleton";

const meta = {
  title: "Components/tasks/TaskDetailsCard",
  component: TaskDetailsCard,
  tags: ["autodocs"],
  args: {
    taskPromise: new Promise((resolve) => resolve(tasksMock[0])),
  },
} satisfies Meta<typeof TaskDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;

export const Skeleton: Story = {
  render: () => <TaskDetailsCardSkeleton />,
};

export const MobileSkeleton = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
  render: () => <TaskDetailsCardSkeleton />,
};
