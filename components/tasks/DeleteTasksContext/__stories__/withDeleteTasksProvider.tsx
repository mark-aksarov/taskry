import { type Decorator } from "@storybook/react";
import { DeleteTasksProvider } from "../DeleteTasksContext";

export const withDeleteTasksProvider: Decorator = (Story) => {
  return (
    <DeleteTasksProvider deleteTasks={() => ({ status: "success" })}>
      <Story />
    </DeleteTasksProvider>
  );
};
