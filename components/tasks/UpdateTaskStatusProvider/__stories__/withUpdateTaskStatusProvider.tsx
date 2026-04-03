import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskStatusProvider } from "./MockedUpdateTaskStatusProvider";

export const withUpdateTaskStatusProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskStatusProvider>
      <Story />
    </MockedUpdateTaskStatusProvider>
  );
};
