import React from "react";
import { type Decorator } from "@storybook/react";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { ProjectCommentsContainerProvider } from "./ProjectCommentsContainerContext";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
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
      ProjectCommentsContainer={() => <CommentItemSkeleton />}
    >
      <Story />
    </ProjectCommentsContainerProvider>
  );
};
