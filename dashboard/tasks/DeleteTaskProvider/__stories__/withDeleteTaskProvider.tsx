import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteTaskProvider } from "./MockedDeleteTaskProvider";

export const withDeleteTaskProvider: Decorator = (Story) => {
  return (
    <MockedDeleteTaskProvider>
      <Story />
    </MockedDeleteTaskProvider>
  );
};
