import { type Decorator } from "@storybook/react";
import { CreateProjectCategoryModalProvider } from "../CreateProjectCategoryModalContext";

export const withCreateProjectCategoryModalProvider: Decorator = (Story) => {
  return (
    <CreateProjectCategoryModalProvider>
      <Story />
    </CreateProjectCategoryModalProvider>
  );
};
