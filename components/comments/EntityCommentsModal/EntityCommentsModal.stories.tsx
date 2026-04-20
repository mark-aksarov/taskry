import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { CommentList } from "../CommentList";
import { Repeat } from "@/components/common/Repeat";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentItemSkeleton } from "../CommentItem";
import { EntityCommentsModal } from "./EntityCommentsModal";
import { CommentsEmptySection } from "../CommentsEmptySection";
import { useModal } from "@/components/common/ModalManagerContext";
import { CommentListExample } from "../CommentList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSendCommentProvider } from "../SendCommentProvider/__stories__";
import { withUpdateCommentProvider } from "../UpdateCommentProvider/__stories__";
import { withDeleteCommentProvider } from "../DeleteCommentProvider/__stories__";
import { withCommentFormProvider } from "@/components/comments/CommentForm/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const meta = {
  title: "components/comments/EntityCommentsModal",
  component: EntityCommentsModal,
  decorators: [
    withOpenModal,
    withDeleteCommentProvider,
    withUpdateCommentProvider,
    withSendCommentProvider,
    withCommentFormProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  render: (args) => {
    const { isOpen, onOpenChange } = useModal("entityComments");
    return (
      <EntityCommentsModal
        {...args}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    );
  },

  parameters: {
    modalId: "entityComments",
  },
} satisfies Meta<typeof EntityCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Entity Comments",
    commentsContainer: <CommentListExample />,
  },
} satisfies Story;

export const WithEmptySection = {
  args: {
    ...Default.args,
    commentsContainer: <CommentsEmptySection />,
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    ...Default.args,
    commentsContainer: (
      <CommentList>
        <Repeat items={10} renderItem={CommentItemSkeleton} />
      </CommentList>
    ),
  },
} satisfies Story;
