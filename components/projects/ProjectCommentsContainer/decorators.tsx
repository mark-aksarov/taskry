import React from "react";
import { type Decorator } from "@storybook/react";
import { Repeat } from "@/components/common/Repeat";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { ProjectCommentsContainerProvider } from "./ProjectCommentsContainerContext";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";

export const withProjectComments: Decorator = (Story) => {
  return (
    <ProjectCommentsContainerProvider
      ProjectCommentsContainer={() => <MockedCommentsContainer />}
    >
      <Story />
    </ProjectCommentsContainerProvider>
  );
};

export const withProjectCommentsEmpty: Decorator = (Story) => {
  return (
    <ProjectCommentsContainerProvider
      ProjectCommentsContainer={() => <CommentsEmptySection />}
    >
      <Story />
    </ProjectCommentsContainerProvider>
  );
};

export const withProjectCommentsSkeleton: Decorator = (Story) => {
  return (
    <ProjectCommentsContainerProvider
      ProjectCommentsContainer={() => (
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
      )}
    >
      <Story />
    </ProjectCommentsContainerProvider>
  );
};
