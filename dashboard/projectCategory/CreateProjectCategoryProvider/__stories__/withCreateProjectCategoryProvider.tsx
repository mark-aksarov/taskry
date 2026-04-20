import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateProjectCategoryProvider } from "./MockedCreateProjectCategoryProvider";

export const withCreateProjectCategoryProvider: Decorator = (Story) => {
  return (
    <MockedCreateProjectCategoryProvider>
      <Story />
    </MockedCreateProjectCategoryProvider>
  );
};
