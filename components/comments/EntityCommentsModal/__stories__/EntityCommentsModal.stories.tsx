import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CommentList } from "../../CommentList";
import { Meta, StoryObj } from "@storybook/react";
import { Repeat } from "@/components/common/Repeat";
import { DialogTrigger } from "react-aria-components";
import { CommentItemSkeleton } from "../../CommentItem";
import { EntityCommentsModal } from "../EntityCommentsModal";
import { CommentListStory } from "../../CommentList/__stories__";
import { CommentsEmptySection } from "../../CommentsEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSendCommentProvider } from "../../SendCommentContext/__stories__";
import { withUpdateCommentProvider } from "../../UpdateCommentContext/__stories__";
import { withCommentFormProvider } from "@/components/comments/CommentForm/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

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
    withUpdateCommentProvider,
    withSendCommentProvider,
    withCommentFormProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof EntityCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Entity Comments",
    commentsContainer: <CommentList {...CommentListStory.args} />,
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
