import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailNavigation } from "./TaskDetailNavigation";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";

const meta = {
  title: "components/tasks/TaskDetailNavigation",
  component: TaskDetailNavigation,
  tags: ["autodocs"],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks/1");
  },
} satisfies Meta<typeof TaskDetailNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
