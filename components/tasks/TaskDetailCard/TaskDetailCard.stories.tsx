import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailCard } from "./TaskDetailCard";
import { mocked } from "storybook/test";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { getTask } from "@/lib/queries/task";
import { usePathname } from "next/navigation";

const meta = {
  title: "components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  tags: ["autodocs"],
  args: {
    id: 1,
  },
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks/1");
    mocked(getTask).mockReturnValue(new Promise((res) => res(tasksMock[0])));
  },
} satisfies Meta<typeof TaskDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
