import { type Decorator } from "@storybook/react";
import { MockedDeleteProjectCategoryProvider } from "./MockedDeleteProjectCategoryProvider";

export const withDeleteProjectCategoryProvider: Decorator = (Story) => {
  return (
    <MockedDeleteProjectCategoryProvider>
      <Story />
    </MockedDeleteProjectCategoryProvider>
  );
};
