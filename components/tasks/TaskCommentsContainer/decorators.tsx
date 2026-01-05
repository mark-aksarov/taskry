import React from "react";
import { type Decorator } from "@storybook/react";
import { Repeat } from "@/components/common/Repeat";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { TaskCommentsContainerContext } from "./TaskCommentsContainerContext";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";

export const withTaskComments: Decorator = (Story) => {
  return (
    <TaskCommentsContainerContext.Provider
      value={() => <MockedCommentsContainer />}
    >
      <Story />
    </TaskCommentsContainerContext.Provider>
  );
};

export const withTaskCommentsEmpty: Decorator = (Story) => {
  return (
    <TaskCommentsContainerContext.Provider
      value={() => <CommentsEmptySection />}
    >
      <Story />
    </TaskCommentsContainerContext.Provider>
  );
};

export const withTaskCommentsSkeleton: Decorator = (Story) => {
  return (
    <TaskCommentsContainerContext.Provider
      value={() => (
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
      )}
    >
      <Story />
    </TaskCommentsContainerContext.Provider>
  );
};
