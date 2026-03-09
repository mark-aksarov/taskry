import { type Decorator } from "@storybook/react";
import { UpdateSubtaskProvider } from "../UpdateSubtaskContext";

export const withUpdateSubtaskProvider: Decorator = (Story) => {
  return (
    <UpdateSubtaskProvider
      taskId={1}
      updateSubtask={() => ({ status: "success" })}
    >
      <Story />
    </UpdateSubtaskProvider>
  );
};
