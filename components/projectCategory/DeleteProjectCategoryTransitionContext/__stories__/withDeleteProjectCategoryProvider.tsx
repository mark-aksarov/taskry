import { type Decorator } from "@storybook/react";
import { DeleteProjectCategoryTransitionProvider } from "../DeleteProjectCategoryTransitionContext";

export const withDeleteProjectCategoryProvider: Decorator = (Story) => {
  return (
    <DeleteProjectCategoryTransitionProvider>
      <Story />
    </DeleteProjectCategoryTransitionProvider>
  );
};
