import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mocked } from "storybook/test";
import { AssignedTasks } from "./AssignedTasks";
import { getTasks } from "@/lib/queries/task";
import { tasksMock } from "../TaskList";

const meta = {
  title: "Components/tasks/AssignedTasks",
  component: AssignedTasks,
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res(tasksMock)));
  },
} satisfies Meta<typeof AssignedTasks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNoTasks: Story = {
  decorators: [
    (Story) => (
      <div className="flex h-[500px]">
        <Story />
      </div>
    ),
  ],
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res([])));
  },
};
