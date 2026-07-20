import { type Decorator } from "@storybook/nextjs-vite";
import { MockedImportProjectCategoriesProvider } from "./MockedImportProjectCategoriesProvider";

export const withImportProjectCategoriesProvider: Decorator = (Story) => {
  return (
    <MockedImportProjectCategoriesProvider>
      <Story />
    </MockedImportProjectCategoriesProvider>
  );
};
