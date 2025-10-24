import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailPanelHeader } from "./TaskDetailPanelHeader";
import { mocked } from "storybook/test";
import { getTask } from "@/lib/queries/task";
import { tasksMock } from "@/lib/data/__mocks__/tasks";

const meta = {
  title: "components/tasks/TaskDetailPanelHeader",
  component: TaskDetailPanelHeader,
  tags: ["autodocs"],
  args: {
    id: 1,
  },
  beforeEach: () => {
    mocked(getTask).mockReturnValue(new Promise((res) => res(tasksMock[0])));
  },
} satisfies Meta<typeof TaskDetailPanelHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
