import { type Decorator } from "@storybook/react";
import { ProjectCreatorFiltersModalProvider } from "../ProjectCreatorFiltersModalContext";

export const withProjectCreatorFiltersModalProvider: Decorator = (Story) => {
  return (
    <ProjectCreatorFiltersModalProvider>
      <Story />
    </ProjectCreatorFiltersModalProvider>
  );
};
