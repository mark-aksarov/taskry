import { fn } from "storybook/test";
import { Repeat } from "@/components/common/Repeat";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { ProjectCommentsModal } from "./ProjectCommentsModal";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

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
  args: {
    sendCommentAction: fn(),
  },
} satisfies Story;

export const Empty = {
  ...Default,
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          ProjectCommentsContainer: () => <CommentsEmptySection />,
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;

export const WithSkeletonContent = {
  ...Default,
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          ProjectCommentsContainer: () => (
            <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
          ),
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
