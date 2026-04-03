import { type Decorator } from "@storybook/nextjs-vite";
import { UpdateCommentContext } from "../../UpdateCommentContext";

export const withUpdateCommentProvider: Decorator = (Story) => {
  return (
    <UpdateCommentContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      <Story />
    </UpdateCommentContext.Provider>
  );
};
