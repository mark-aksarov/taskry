import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateSubtaskProvider } from "./MockedUpdateSubtaskProvider";

export const withUpdateSubtaskProvider: Decorator = (Story) => {
  return (
    <MockedUpdateSubtaskProvider>
      <Story />
    </MockedUpdateSubtaskProvider>
  );
};
