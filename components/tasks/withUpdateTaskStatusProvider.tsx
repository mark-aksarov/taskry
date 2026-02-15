import { type Decorator } from "@storybook/react";
import { UpdateTaskStatusProvider } from "./UpdateTaskStatusContext";

export const withUpdateTaskStatusProvider: Decorator = (Story) => {
  return (
    <UpdateTaskStatusProvider
      updateTaskStatus={() =>
        new Promise((res) => setTimeout(() => res({ status: "success" }), 500))
      }
    >
      <Story />
    </UpdateTaskStatusProvider>
  );
};
