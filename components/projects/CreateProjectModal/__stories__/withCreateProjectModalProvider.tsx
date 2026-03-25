import { type Decorator } from "@storybook/react";
import { CreateProjectModalProvider } from "../CreateProjectModalContext";

export const withCreateProjectModalProvider: Decorator = (Story) => {
  return (
    <CreateProjectModalProvider>
      <Story />
    </CreateProjectModalProvider>
  );
};
