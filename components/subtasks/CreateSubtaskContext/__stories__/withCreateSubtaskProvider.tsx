import { type Decorator } from "@storybook/react";
import { CreateSubtaskProvider } from "../../CreateSubtaskContext";

export const withCreateSubtaskProvider: Decorator = (Story) => {
  return (
    <CreateSubtaskProvider
      taskId={1}
      createSubtask={() => ({ status: "success" })}
    >
      <Story />
    </CreateSubtaskProvider>
  );
};
