import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectCategoryRelProvider } from "./MockedUpdateProjectCategoryRelProvider";

export const withUpdateProjectCategoryRelProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectCategoryRelProvider>
      <Story />
    </MockedUpdateProjectCategoryRelProvider>
  );
};
