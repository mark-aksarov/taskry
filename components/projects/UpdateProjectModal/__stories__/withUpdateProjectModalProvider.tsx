import { type Decorator } from "@storybook/react";
import { UpdateProjectModalProvider } from "../UpdateProjectModalContext";

export const withUpdateProjectModalProvider: Decorator = (Story) => {
  return (
    <UpdateProjectModalProvider>
      <Story />
    </UpdateProjectModalProvider>
  );
};
