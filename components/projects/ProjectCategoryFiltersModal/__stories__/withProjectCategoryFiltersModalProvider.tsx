import { type Decorator } from "@storybook/react";
import { ProjectCategoryFiltersModalProvider } from "../ProjectCategoryFiltersModalContext";

export const withProjectCategoryFiltersModalProvider: Decorator = (Story) => {
  return (
    <ProjectCategoryFiltersModalProvider>
      <Story />
    </ProjectCategoryFiltersModalProvider>
  );
};
