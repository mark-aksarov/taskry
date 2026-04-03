import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectCategoryProvider } from "./MockedUpdateProjectCategoryProvider";

export const withUpdateProjectCategoryProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectCategoryProvider>
      <Story />
    </MockedUpdateProjectCategoryProvider>
  );
};
