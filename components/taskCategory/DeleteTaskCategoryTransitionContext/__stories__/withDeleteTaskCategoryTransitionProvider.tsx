import { type Decorator } from "@storybook/react";
import { DeleteTaskCategoryTransitionProvider } from "../DeleteTaskCategoryTransitionContext";

export const withDeleteTaskCategoryTransitionProvider: Decorator = (Story) => {
  return (
    <DeleteTaskCategoryTransitionProvider>
      <Story />
    </DeleteTaskCategoryTransitionProvider>
  );
};
