import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskList } from "./SubtaskList";
import { subtasksMock } from "@/lib/data/__mocks__/subtasks";

const meta = {
  title: "Components/subtasks/SubtaskList",
  component: SubtaskList,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    subtasks: subtasksMock,
  },
} satisfies Meta<typeof SubtaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
