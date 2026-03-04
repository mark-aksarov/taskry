import { type Decorator } from "@storybook/react";
import { DeleteTaskProvider } from "../DeleteTaskContext";

export const withDeleteTaskProvider: Decorator = (Story) => {
  return (
    <DeleteTaskProvider deleteTask={() => ({ status: "success" })}>
      <Story />
    </DeleteTaskProvider>
  );
};
