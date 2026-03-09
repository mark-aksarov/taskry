import { type Decorator } from "@storybook/react";
import { UpdateCommentProvider } from "../../UpdateCommentContext";

export const withUpdateCommentProvider: Decorator = (Story) => {
  return (
    <UpdateCommentProvider updateComment={() => ({ status: "success" })}>
      <Story />
    </UpdateCommentProvider>
  );
};
