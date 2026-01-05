import React from "react";
import { type Decorator } from "@storybook/react";
import { Repeat } from "@/components/common/Repeat";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { ProjectCommentsContainerContext } from "./ProjectCommentsContainerContext";

export const withProjectComments: Decorator = (Story) => {
  return (
    <ProjectCommentsContainerContext.Provider
      value={() => <MockedCommentsContainer />}
    >
      <Story />
    </ProjectCommentsContainerContext.Provider>
  );
};

export const withProjectCommentsEmpty: Decorator = (Story) => {
  return (
    <ProjectCommentsContainerContext.Provider
      value={() => <CommentsEmptySection />}
    >
      <Story />
    </ProjectCommentsContainerContext.Provider>
  );
};

export const withProjectCommentsSkeleton: Decorator = (Story) => {
  return (
    <ProjectCommentsContainerContext.Provider
      value={() => (
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
      )}
    >
      <Story />
    </ProjectCommentsContainerContext.Provider>
  );
};
