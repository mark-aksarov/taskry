import {
  withTaskComments,
  withTaskCommentsEmpty,
  withTaskCommentsSkeleton,
} from "../TaskCommentsContainer/decorators";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModalTrigger } from "./TaskCommentsModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskCommentsModalTrigger",
  component: TaskCommentsModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    commentCount: 25,
    taskId: 1,
  },
} satisfies Meta<typeof TaskCommentsModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  decorators: [withTaskComments],
} satisfies Story;

export const Empty = {
  decorators: [withTaskCommentsEmpty],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [withTaskCommentsSkeleton],
} satisfies Story;
