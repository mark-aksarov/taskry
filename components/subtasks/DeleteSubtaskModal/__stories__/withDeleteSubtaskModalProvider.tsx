import { type Decorator } from "@storybook/react";
import { DeleteSubtaskModalProvider } from "../DeleteSubtaskModalContext";

export const withDeleteSubtaskModalProvider: Decorator = (Story) => {
  return (
    <DeleteSubtaskModalProvider
      deleteEntity={() => ({ status: "success" })}
      mutate={() => {}}
    >
      <Story />
    </DeleteSubtaskModalProvider>
  );
};
