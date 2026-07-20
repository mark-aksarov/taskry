import { type Decorator } from "@storybook/nextjs-vite";
import { MockedImportTasksProvider } from "./MockedImportTasksProvider";

export const withImportTasksProvider: Decorator = (Story) => {
  return (
    <MockedImportTasksProvider>
      <Story />
    </MockedImportTasksProvider>
  );
};
