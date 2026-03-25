import { type Decorator } from "@storybook/react";
import { MockedUpdateProjectCategoryProvider } from "./MockedUpdateProjectCategoryProvider";

export const withUpdateProjectCategoryProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectCategoryProvider>
      <Story />
    </MockedUpdateProjectCategoryProvider>
  );
};
