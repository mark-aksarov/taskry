import React from "react";
import { type Decorator } from "@storybook/react";
import { Repeat } from "@/components/common/Repeat";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { ProjectCommentsClientContainerContext } from "./ProjectCommentsClientContainerContext";

export const withProjectComments: Decorator = (Story) => {
  return (
    <ProjectCommentsClientContainerContext.Provider
      value={() => <MockedCommentsContainer />}
    >
      <Story />
    </ProjectCommentsClientContainerContext.Provider>
  );
};

export const withProjectCommentsEmpty: Decorator = (Story) => {
  return (
    <ProjectCommentsClientContainerContext.Provider
      value={() => <CommentsEmptySection />}
    >
      <Story />
    </ProjectCommentsClientContainerContext.Provider>
  );
};

export const withProjectCommentsSkeleton: Decorator = (Story) => {
  return (
    <ProjectCommentsClientContainerContext.Provider
      value={() => (
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
      )}
    >
      <Story />
    </ProjectCommentsClientContainerContext.Provider>
  );
};
