import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AssignedTasks } from "./AssignedTasks";
import { Default as TaskListStory } from "../TaskList/TaskList.stories";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/tasks/AssignedTasks",
  component: AssignedTasks,
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof AssignedTasks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: TaskListStory.args,
} satisfies Story;

export const Loading = {
  args: {
    tasks: undefined,
  },
} satisfies Story;
