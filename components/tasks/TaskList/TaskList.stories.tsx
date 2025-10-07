import { TaskList } from "./TaskList";
import { tasksMock } from "./tasksMock";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/tasks/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  args: {
    tasks: tasksMock,
  },
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
