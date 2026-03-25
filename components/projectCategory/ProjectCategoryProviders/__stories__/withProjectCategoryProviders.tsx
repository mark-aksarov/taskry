import { type Decorator } from "@storybook/react";
import { MockedProjectCategoryProviders } from "./MockedProjectCategoryProviders";

export const withProjectCategoryProviders: Decorator = (Story) => {
  return (
    <MockedProjectCategoryProviders>
      <Story />
    </MockedProjectCategoryProviders>
  );
};
