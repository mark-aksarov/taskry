import { type Decorator } from "@storybook/react";
import { DeleteTaskCategoryModalProvider } from "../DeleteTaskCategoryModalContext";

export const withDeleteTaskCategoryModalProvider: Decorator = (Story) => {
  return (
    <DeleteTaskCategoryModalProvider
      deleteEntity={() => ({ status: "success" })}
    >
      <Story />
    </DeleteTaskCategoryModalProvider>
  );
};
