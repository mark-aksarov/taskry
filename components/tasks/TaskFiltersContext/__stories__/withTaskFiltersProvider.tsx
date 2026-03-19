import { type Decorator } from "@storybook/react";
import { TaskFiltersProvider } from "../TaskFiltersContext";

export const withTaskFiltersProvider: Decorator = (Story) => {
  return (
    <TaskFiltersProvider filters={{}}>
      <Story />
    </TaskFiltersProvider>
  );
};
