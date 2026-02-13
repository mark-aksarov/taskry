import { TaskDetailAlt } from "./TaskDetailAlt";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailStory } from "../TaskDetail/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetailWithoutSomeDataStory } from "../TaskDetail/__stories__";

const meta = {
  title: "components/tasks/TaskDetailAlt",
  component: TaskDetailAlt,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskDetailAlt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  ...TaskDetailStory,
} satisfies Story;

export const WithoutSomeData = {
  ...TaskDetailWithoutSomeDataStory,
} satisfies Story;
