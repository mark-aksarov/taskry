import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteCommentProvider } from "./MockedDeleteCommentProvider";

export const withDeleteCommentProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCommentProvider>
      <Story />
    </MockedDeleteCommentProvider>
  );
};
