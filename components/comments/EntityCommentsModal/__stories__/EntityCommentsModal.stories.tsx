import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { Repeat } from "@/components/common/Repeat";
import { DialogTrigger } from "react-aria-components";
import { CommentItemSkeleton } from "../../CommentItem";
import { EntityCommentsModal } from "../EntityCommentsModal";
import { getCommentList } from "../../CommentList/__stories__";
import { CommentsEmptySection } from "../../CommentsEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCommentFormProvider } from "@/components/comments/CommentForm/__stories__/withCommentFormProvider";

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
    withCommentFormProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof EntityCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Entity Comments",
    commentsContainer: getCommentList(),
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
