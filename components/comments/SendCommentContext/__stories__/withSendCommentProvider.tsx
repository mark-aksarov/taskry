import { type Decorator } from "@storybook/react";
import { SendCommentProvider } from "../../SendCommentContext";

export const withSendCommentProvider: Decorator = (Story) => {
  return (
    <SendCommentProvider sendComment={() => ({ status: "success" })}>
      <Story />
    </SendCommentProvider>
  );
};
