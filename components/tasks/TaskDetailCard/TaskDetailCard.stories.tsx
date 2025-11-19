import { TaskDetail } from "../TaskDetail";
import { TaskDetailCard } from "./TaskDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";

const meta = {
  title: "Components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [withThemedBackground],
  args: {
    taskDetail: <TaskDetail {...TaskDetailStory.args} />,
  },
} satisfies Meta<typeof TaskDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
