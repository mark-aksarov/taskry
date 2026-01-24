import { type Decorator } from "@storybook/react";
import { CommentFormProvider } from "./CommentFormContext";

export const withCommentFormProvider: Decorator = (Story) => {
  return (
    <CommentFormProvider>
      <Story />
    </CommentFormProvider>
  );
};
