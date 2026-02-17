import { type Decorator } from "@storybook/react";
import { DeleteTaskModalProvider } from "../DeleteTaskModalContext";

export const withDeleteTaskModalProvider: Decorator = (Story) => {
  return (
    <DeleteTaskModalProvider deleteEntity={() => ({ status: "success" })}>
      <Story />
    </DeleteTaskModalProvider>
  );
};
