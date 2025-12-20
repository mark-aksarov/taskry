import { type Decorator } from "@storybook/react";
import { ProjectsSelectionProvider } from "./ProjectsSelectionContext";

export const withProjectsSelectionProvider: Decorator = (Story) => {
  return (
    <ProjectsSelectionProvider>
      <Story />
    </ProjectsSelectionProvider>
  );
};
