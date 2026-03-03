import { type Decorator } from "@storybook/react";
import { DeleteTaskCategoryProvider } from "../DeleteTaskCategoryContext";

export const withDeleteTaskCategoryProvider: Decorator = (Story) => {
  return (
    <DeleteTaskCategoryProvider
      deleteTaskCategory={() => ({ status: "success" })}
    >
      <Story />
    </DeleteTaskCategoryProvider>
  );
};
