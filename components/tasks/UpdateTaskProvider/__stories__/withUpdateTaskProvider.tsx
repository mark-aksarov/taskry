import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskProvider } from "./MockedUpdateTaskProvider";

export const withUpdateTaskProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskProvider>
      <Story />
    </MockedUpdateTaskProvider>
  );
};
