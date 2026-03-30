import { type Decorator } from "@storybook/react";
import { SendCommentContext } from "../../SendCommentContext";

export const withSendCommentProvider: Decorator = (Story) => {
  return (
    <SendCommentContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      <Story />
    </SendCommentContext.Provider>
  );
};
