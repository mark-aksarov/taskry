import { TaskDetailAlt } from "./TaskDetailAlt";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";
import { WithoutSomeData as WithoutSomeDataStory } from "../TaskDetail/TaskDetail.stories";

const meta = {
  title: "components/tasks/TaskDetailAlt",
  component: TaskDetailAlt,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
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
  ...WithoutSomeDataStory,
} satisfies Story;
