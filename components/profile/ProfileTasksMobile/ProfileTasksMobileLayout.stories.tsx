import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTasksMobileLayout } from "./ProfileTasksMobileLayout";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { withUpdateSubtasksForm } from "@/components/subtasks/UpdateSubtasksForm/decorators";
import { Default as ProfileTaskListStory } from "../ProfileTaskList/ProfileTaskList.stories";

const meta = {
  title: "components/profile/ProfileTasksMobileLayout",
  component: ProfileTasksMobileLayout,
  tags: ["autodocs"],
  decorators: [
    withTaskDetailCompact,
    withTaskComments,
    withUpdateSubtasksForm,
    withThemedBackground,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof ProfileTasksMobileLayout>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  parameters: { layout: "fullscreen" },
  args: {
    children: ProfileTaskListStory.args?.children,
  },
} satisfies Story;

export const Empty = {
  parameters: { layout: "centered" },
  args: {
    children: undefined,
  },
} satisfies Story;
