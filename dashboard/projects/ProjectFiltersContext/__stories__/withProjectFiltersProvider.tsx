import { type Decorator } from "@storybook/nextjs-vite";
import { ProjectFiltersProvider } from "../ProjectFiltersContext";

export const withProjectFiltersProvider: Decorator = (Story) => {
  return (
    <ProjectFiltersProvider filters={{}}>
      <Story />
    </ProjectFiltersProvider>
  );
};
