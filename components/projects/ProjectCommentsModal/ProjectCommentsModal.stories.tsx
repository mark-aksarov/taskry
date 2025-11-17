import {
  withProjectComments,
  withProjectCommentsEmpty,
  withProjectCommentsSkeleton,
} from "../ProjectCommentsContainer/decorators";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { ProjectCommentsModal } from "./ProjectCommentsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/ProjectCommentsModal",
  component: ProjectCommentsModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Project comments" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    projectId: 1,
  },
} satisfies Meta<typeof ProjectCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  decorators: [withProjectComments],
} satisfies Story;

export const Empty = {
  decorators: [withProjectCommentsEmpty],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [withProjectCommentsSkeleton],
} satisfies Story;
