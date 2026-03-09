import { type Decorator } from "@storybook/react";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";

export const withUpdateStatusTaskProvider: Decorator = (Story) => {
  return (
    <UpdateTaskStatusProvider updateTaskStatus={() => ({ status: "success" })}>
      <Story />
    </UpdateTaskStatusProvider>
  );
};
