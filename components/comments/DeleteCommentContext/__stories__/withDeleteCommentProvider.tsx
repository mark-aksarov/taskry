import { type Decorator } from "@storybook/react";
import { DeleteCommentProvider } from "../DeleteCommentContext";

export const withDeleteCommentProvider: Decorator = (Story) => {
  return (
    <DeleteCommentProvider deleteComment={() => ({ status: "success" })}>
      <Story />
    </DeleteCommentProvider>
  );
};
