import { type Decorator } from "@storybook/react";
import { TasksSelectionProvider } from "./TasksSelectionContext";

export const withTasksSelectionProvider: Decorator = (Story) => {
  return (
    <TasksSelectionProvider>
      <Story />
    </TasksSelectionProvider>
  );
};
