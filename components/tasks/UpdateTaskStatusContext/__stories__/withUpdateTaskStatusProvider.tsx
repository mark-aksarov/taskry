import { type Decorator } from "@storybook/react";
import { UpdateTaskStatusProvider } from "..";

export const withUpdateTaskStatusProvider: Decorator = (Story) => {
  return (
    <UpdateTaskStatusProvider
      updateStatus={() =>
        new Promise((res) => setTimeout(() => res({ status: "success" }), 500))
      }
    >
      <Story />
    </UpdateTaskStatusProvider>
  );
};
