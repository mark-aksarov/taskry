import { type Decorator } from "@storybook/react";
import { DeleteCommentTransitionProvider } from "../DeleteCommentTransitionContext";

export const withDeleteCommentTransitionProvider: Decorator = (Story) => {
  return (
    <DeleteCommentTransitionProvider>
      <Story />
    </DeleteCommentTransitionProvider>
  );
};
