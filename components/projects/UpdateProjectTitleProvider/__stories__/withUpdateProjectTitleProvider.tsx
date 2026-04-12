import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectTitleProvider } from "./MockedUpdateProjectTitleProvider";

export const withUpdateProjectTitleProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectTitleProvider>
      <Story />
    </MockedUpdateProjectTitleProvider>
  );
};
