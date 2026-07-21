import { type Decorator } from "@storybook/nextjs-vite";
import { MockedExportTasksProvider } from "./MockedExportTasksProvider";

export const withExportTasksProvider: Decorator = (Story) => {
  return (
    <MockedExportTasksProvider>
      <Story />
    </MockedExportTasksProvider>
  );
};
