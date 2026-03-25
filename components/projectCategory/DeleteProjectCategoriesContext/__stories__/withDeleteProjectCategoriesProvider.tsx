import { type Decorator } from "@storybook/react";
import { MockedDeleteProjectCategoriesProvider } from "./MockedDeleteProjectCategoriesProvider";

export const withDeleteProjectCategoriesProvider: Decorator = (Story) => {
  return (
    <MockedDeleteProjectCategoriesProvider>
      <Story />
    </MockedDeleteProjectCategoriesProvider>
  );
};
