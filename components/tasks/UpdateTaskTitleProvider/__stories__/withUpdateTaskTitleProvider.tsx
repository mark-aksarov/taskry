import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskTitleProvider } from "./MockedUpdateTaskTitleProvider";

export const withUpdateTaskTitleProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskTitleProvider>
      <Story />
    </MockedUpdateTaskTitleProvider>
  );
};
