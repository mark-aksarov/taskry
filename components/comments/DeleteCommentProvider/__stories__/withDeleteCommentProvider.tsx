import { type Decorator } from "@storybook/react";
import { MockedDeleteCommentProvider } from "./MockedDeleteCommentProvider";

export const withDeleteCommentProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCommentProvider>
      <Story />
    </MockedDeleteCommentProvider>
  );
};
