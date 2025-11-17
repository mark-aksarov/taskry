import React from "react";
import { type Decorator } from "@storybook/react";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { TaskCommentsContainerProvider } from "./TaskCommentsContainerContext";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { Repeat } from "@/components/common/Repeat";

export const withTaskComments: Decorator = (Story) => {
  return (
    <TaskCommentsContainerProvider
      TaskCommentsContainer={() => <MockedCommentsContainer />}
    >
      <Story />
    </TaskCommentsContainerProvider>
  );
};

export const withTaskCommentsEmpty: Decorator = (Story) => {
  return (
    <TaskCommentsContainerProvider
      TaskCommentsContainer={() => <CommentsEmptySection />}
    >
      <Story />
    </TaskCommentsContainerProvider>
  );
};

export const withTaskCommentsSkeleton: Decorator = (Story) => {
  return (
    <TaskCommentsContainerProvider
      TaskCommentsContainer={() => (
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
      )}
    >
      <Story />
    </TaskCommentsContainerProvider>
  );
};
