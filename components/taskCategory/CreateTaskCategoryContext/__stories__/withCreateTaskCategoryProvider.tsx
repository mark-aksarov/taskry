import { type Decorator } from "@storybook/react";
import { CreateTaskCategoryProvider } from "../../CreateTaskCategoryContext";

export const withCreateTaskCategoryProvider: Decorator = (Story) => {
  return (
    <CreateTaskCategoryProvider
      createTaskCategory={() => ({ status: "success" })}
    >
      <Story />
    </CreateTaskCategoryProvider>
  );
};
