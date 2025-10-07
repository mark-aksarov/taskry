import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskItem } from "./TaskItem";
import { tasksMock } from "../TaskList";

const meta = {
  title: "Components/tasks/TaskItem",
  component: TaskItem,
  tags: ["autodocs"],
  args: {
    task: tasksMock[0],
  },
} satisfies Meta<typeof TaskItem>;

export default meta;
type Story = StoryObj<typeof TaskItem>;

export const Default: Story = {};

export const WithoutCreator: Story = {
  args: {
    task: {
      ...tasksMock[0],
      creator: null,
    },
  },
};

export const WithCheckbox: Story = {
  args: {
    showCheckbox: true,
  },
};

export const Skeleton: Story = {
  args: {
    task: undefined,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
