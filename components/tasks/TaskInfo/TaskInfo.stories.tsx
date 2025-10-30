import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskInfo } from "./TaskInfo";
import { taskDetailMock } from "@/lib/data/__mocks__/tasks";

const meta = {
  title: "components/tasks/TaskInfo",
  component: TaskInfo,
  tags: ["autodocs"],
  args: {
    taskPromise: new Promise((resolve) => resolve(taskDetailMock)),
  },
} satisfies Meta<typeof TaskInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
