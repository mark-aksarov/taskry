import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteSubtaskProvider } from "./MockedDeleteSubtaskProvider";

export const withDeleteSubtaskProvider: Decorator = (Story) => {
  return (
    <MockedDeleteSubtaskProvider>
      <Story />
    </MockedDeleteSubtaskProvider>
  );
};
