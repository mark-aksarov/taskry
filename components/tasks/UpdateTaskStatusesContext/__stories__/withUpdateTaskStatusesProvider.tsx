import { type Decorator } from "@storybook/react";
import { UpdateTaskStatusesProvider } from "../UpdateTaskStatusesContext";

export const withUpdateTaskStatusesProvider: Decorator = (Story) => {
  return (
    <UpdateTaskStatusesProvider
      updateTaskStatuses={() => ({ status: "success" })}
    >
      <Story />
    </UpdateTaskStatusesProvider>
  );
};
