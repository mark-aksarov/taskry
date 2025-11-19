import React from "react";
import { type Decorator } from "@storybook/react";
import { Repeat } from "@/components/common/Repeat";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { TaskCommentsClientContainerContext } from "./TaskCommentsClientContainerContext";

export const withTaskComments: Decorator = (Story) => {
  return (
    <TaskCommentsClientContainerContext.Provider
      value={() => <MockedCommentsContainer />}
    >
      <Story />
    </TaskCommentsClientContainerContext.Provider>
  );
};

export const withTaskCommentsEmpty: Decorator = (Story) => {
  return (
    <TaskCommentsClientContainerContext.Provider
      value={() => <CommentsEmptySection />}
    >
      <Story />
    </TaskCommentsClientContainerContext.Provider>
  );
};

export const withTaskCommentsSkeleton: Decorator = (Story) => {
  return (
    <TaskCommentsClientContainerContext.Provider
      value={() => (
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
      )}
    >
      <Story />
    </TaskCommentsClientContainerContext.Provider>
  );
};
