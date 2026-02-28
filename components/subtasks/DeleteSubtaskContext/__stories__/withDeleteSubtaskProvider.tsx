import { type Decorator } from "@storybook/react";
import { DeleteSubtaskProvider } from "../DeleteSubtaskContext";

export const withDeleteSubtaskProvider: Decorator = (Story) => {
  return (
    <DeleteSubtaskProvider deleteSubtask={() => ({ status: "success" })}>
      <Story />
    </DeleteSubtaskProvider>
  );
};
