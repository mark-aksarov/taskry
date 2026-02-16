import { type Decorator } from "@storybook/react";
import { UpdateTaskStatusesProvider } from "../UpdateTaskStatusesContext";

export const withUpdateTaskStatusesProvider: Decorator = (Story) => {
  return (
    <UpdateTaskStatusesProvider
      updateStatus={() =>
        new Promise((res) => setTimeout(() => res({ status: "success" }), 500))
      }
    >
      <Story />
    </UpdateTaskStatusesProvider>
  );
};
