import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListItem } from "./TaskListItem";
import { tasksMock } from "@/lib/data/__mocks__/tasks";

const meta = {
  title: "Components/tasks/TaskListItem",
  component: TaskListItem,
  tags: ["autodocs"],
  args: {
    task: tasksMock[0],
  },
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof TaskListItem>;

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
    viewport: { value: "mobile2", isRotated: false },
  },
};
