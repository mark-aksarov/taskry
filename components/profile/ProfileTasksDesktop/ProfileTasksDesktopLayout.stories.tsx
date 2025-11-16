import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTasksDesktopLayout } from "./ProfileTasksDesktopLayout";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProfileTaskListStory } from "../ProfileTaskList/ProfileTaskList.stories";
import { withTaskDetail } from "@/components/tasks/TaskDetail/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsContainer/decorators";

const meta = {
  title: "components/profile/ProfileTasksDesktopLayout",
  component: ProfileTasksDesktopLayout,
  tags: ["autodocs"],
  decorators: [withTaskDetail, withTaskComments, withThemedBackground],
  globals: {
    viewport: { value: "tablet", isRotated: true },
  },
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProfileTasksDesktopLayout>;

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
