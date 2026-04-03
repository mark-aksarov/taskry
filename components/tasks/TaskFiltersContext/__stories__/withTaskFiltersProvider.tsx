import { type Decorator } from "@storybook/nextjs-vite";
import { TaskFiltersProvider } from "../TaskFiltersContext";

export const withTaskFiltersProvider: Decorator = (Story) => {
  return (
    <TaskFiltersProvider filters={{}}>
      <Story />
    </TaskFiltersProvider>
  );
};
