import { type Decorator } from "@storybook/nextjs-vite";
import { MockedImportTaskCategoriesProvider } from "./MockedImportTaskCategoriesProvider";

export const withImportTaskCategoriesProvider: Decorator = (Story) => {
  return (
    <MockedImportTaskCategoriesProvider>
      <Story />
    </MockedImportTaskCategoriesProvider>
  );
};
