import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { Repeat } from "@/components/common/Repeat";
import { DialogTrigger } from "react-aria-components";
import { EntityCommentsModal } from "../EntityCommentsModal";
import { getCommentList } from "../../CommentList/__stories__";
import { CommentsEmptySection } from "../../CommentsEmptySection";
import { CommentItem, CommentItemSkeleton } from "../../CommentItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCommentFormProvider } from "@/components/comments/withCommentFormProvider";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "components/comments/EntityCommentsModal",
  component: EntityCommentsModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Comments" />
          <Story />
        </DialogTrigger>
      );
    },
    withDeleteCommentModalProvider,
    withCommentFormProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof EntityCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    entityId: 1,
    entityKey: "entityId",
    mutateUrl: "/api/enity/1/comments",
    title: "Entity Comments",
    commentsContainer: getCommentList(),
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
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
    commentsContainer: <Repeat items={10} renderItem={CommentItemSkeleton} />,
  },
} satisfies Story;
