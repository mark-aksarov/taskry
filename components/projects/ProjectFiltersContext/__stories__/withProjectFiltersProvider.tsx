import { type Decorator } from "@storybook/react";
import { ProjectFiltersProvider } from "../ProjectFiltersContext";

export const withProjectFiltersProvider: Decorator = (Story) => {
  return (
    <ProjectFiltersProvider>
      <Story />
    </ProjectFiltersProvider>
  );
};
