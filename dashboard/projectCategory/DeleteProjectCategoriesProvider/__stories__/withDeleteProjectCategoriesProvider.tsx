import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteProjectCategoriesProvider } from "./MockedDeleteProjectCategoriesProvider";

export const withDeleteProjectCategoriesProvider: Decorator = (Story) => {
  return (
    <MockedDeleteProjectCategoriesProvider>
      <Story />
    </MockedDeleteProjectCategoriesProvider>
  );
};
