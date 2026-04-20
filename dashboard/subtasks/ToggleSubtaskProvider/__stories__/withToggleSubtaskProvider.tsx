import { type Decorator } from "@storybook/nextjs-vite";
import { MockedToggleSubtaskProvider } from "./MockedToggleSubtaskProvider";

export const withToggleSubtaskProvider: Decorator = (Story) => {
  return (
    <MockedToggleSubtaskProvider>
      <Story />
    </MockedToggleSubtaskProvider>
  );
};
