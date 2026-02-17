import { type Decorator } from "@storybook/react";
import { DeleteCommentModalProvider } from "../DeleteCommentModalContext";

export const withDeleteCommentModalProvider: Decorator = (Story) => {
  return (
    <DeleteCommentModalProvider
      deleteEntity={() => ({ status: "success" })}
      mutate={() => {}}
    >
      <Story />
    </DeleteCommentModalProvider>
  );
};
