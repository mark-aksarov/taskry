import { type Decorator } from "@storybook/react";
import { MockedCreateProjectCategoryProvider } from "./MockedCreateProjectCategoryProvider";

export const withCreateProjectCategoryProvider: Decorator = (Story) => {
  return (
    <MockedCreateProjectCategoryProvider>
      <Story />
    </MockedCreateProjectCategoryProvider>
  );
};
