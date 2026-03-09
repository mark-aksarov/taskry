import { type Decorator } from "@storybook/react";
import { UpdateTaskCategoryProvider } from "../UpdateTaskCategoryContext";

export const withUpdateTaskCategoryProvider: Decorator = (Story) => {
  return (
    <UpdateTaskCategoryProvider
      updateTaskCategory={() => ({ status: "success" })}
    >
      <Story />
    </UpdateTaskCategoryProvider>
  );
};
