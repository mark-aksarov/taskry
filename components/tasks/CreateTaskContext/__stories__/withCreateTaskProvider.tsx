import { type Decorator } from "@storybook/react";
import { CreateTaskProvider } from "../../CreateTaskContext";

export const withCreateTaskProvider: Decorator = (Story) => {
  return (
    <CreateTaskProvider createTask={() => ({ status: "success" })}>
      <Story />
    </CreateTaskProvider>
  );
};
