import { type Decorator } from "@storybook/react";
import { UpdateTaskProvider } from "../UpdateTaskContext";

export const withUpdateTaskProvider: Decorator = (Story) => {
  return (
    <UpdateTaskProvider updateTask={() => ({ status: "success" })}>
      <Story />
    </UpdateTaskProvider>
  );
};
