import { type Decorator } from "@storybook/react";
import { UpdateProjectCategoryModalProvider } from "../UpdateProjectCategoryModalContext";

export const withUpdateProjectCategoryModalProvider: Decorator = (Story) => {
  return (
    <UpdateProjectCategoryModalProvider>
      <Story />
    </UpdateProjectCategoryModalProvider>
  );
};
