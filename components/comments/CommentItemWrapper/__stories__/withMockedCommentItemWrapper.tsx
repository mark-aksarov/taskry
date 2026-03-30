import { Decorator } from "@storybook/nextjs-vite";
import { MockedCommentItemWrapper } from "./MockedCommentItemWrapper";

export const withMockedCommentItemWrapper: Decorator = (Story) => {
  return (
    <MockedCommentItemWrapper>
      <Story />
    </MockedCommentItemWrapper>
  );
};
