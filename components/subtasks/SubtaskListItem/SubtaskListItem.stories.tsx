import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskListItem } from "./SubtaskListItem";
import { subtasksMock } from "@/lib/data/__mocks__/subtasks";

const meta = {
  title: "Components/subtasks/SubtaskListItem",
  component: SubtaskListItem,
  tags: ["autodocs"],
  args: {
    subtask: subtasksMock[0],
  },
} satisfies Meta<typeof SubtaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    subtask: undefined,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
