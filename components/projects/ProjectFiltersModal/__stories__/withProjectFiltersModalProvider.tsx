import { type Decorator } from "@storybook/react";
import { ProjectFiltersModalProvider } from "../ProjectFiltersModalContext";

export const withProjectFiltersModalProvider: Decorator = (Story) => {
  return (
    <ProjectFiltersModalProvider>
      <Story />
    </ProjectFiltersModalProvider>
  );
};
