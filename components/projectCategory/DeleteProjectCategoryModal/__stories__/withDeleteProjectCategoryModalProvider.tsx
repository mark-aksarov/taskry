import { type Decorator } from "@storybook/react";
import { DeleteProjectCategoryModalProvider } from "../DeleteProjectCategoryModalContext";

export const withDeleteProjectCategoryModalProvider: Decorator = (Story) => {
  return (
    <DeleteProjectCategoryModalProvider>
      <Story />
    </DeleteProjectCategoryModalProvider>
  );
};
