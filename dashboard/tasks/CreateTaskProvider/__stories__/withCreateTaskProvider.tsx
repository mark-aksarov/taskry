import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateTaskProvider } from "./MockedCreateTaskProvider";

export const withCreateTaskProvider: Decorator = (Story) => {
  return (
    <MockedCreateTaskProvider>
      <Story />
    </MockedCreateTaskProvider>
  );
};
