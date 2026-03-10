import { type Decorator } from "@storybook/react";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";

export const withUpdateTaskStatusProvider: Decorator = (Story) => {
  return (
    <UpdateTaskStatusProvider updateTaskStatus={() => ({ status: "success" })}>
      <Story />
    </UpdateTaskStatusProvider>
  );
};
