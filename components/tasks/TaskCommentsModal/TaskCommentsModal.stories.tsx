import {
  withTaskCommentsEmpty,
  withTaskCommentsSkeleton,
} from "../TaskCommentsContainer/decorators";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModal } from "./TaskCommentsModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskCommentsModal",
  component: TaskCommentsModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Task comments" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    taskId: 1,
  },
} satisfies Meta<typeof TaskCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Empty = {
  decorators: [withTaskCommentsEmpty],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [withTaskCommentsSkeleton],
} satisfies Story;
