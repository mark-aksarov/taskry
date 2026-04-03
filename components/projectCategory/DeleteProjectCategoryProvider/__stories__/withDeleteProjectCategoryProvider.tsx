import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteProjectCategoryProvider } from "./MockedDeleteProjectCategoryProvider";

export const withDeleteProjectCategoryProvider: Decorator = (Story) => {
  return (
    <MockedDeleteProjectCategoryProvider>
      <Story />
    </MockedDeleteProjectCategoryProvider>
  );
};
