import { type Decorator } from "@storybook/react";
import { DeleteTaskModalProvider } from "../DeleteTaskModalContext";

export const withDeleteTaskModalProvider: Decorator = (Story) => {
  return (
    <DeleteTaskModalProvider deleteTask={() => ({ status: "success" })}>
      <Story />
    </DeleteTaskModalProvider>
  );
};
