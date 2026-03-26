import { type Decorator } from "@storybook/react";
import { DeleteProjectModalProvider } from "../DeleteProjectModalContext";

export const withDeleteProjectModalProvider: Decorator = (Story) => {
  return (
    <DeleteProjectModalProvider>
      <Story />
    </DeleteProjectModalProvider>
  );
};
