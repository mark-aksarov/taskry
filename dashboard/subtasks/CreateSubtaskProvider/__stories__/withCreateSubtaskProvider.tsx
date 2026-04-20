import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateSubtaskProvider } from "./MockedCreateSubtaskProvider";

export const withCreateSubtaskProvider: Decorator = (Story) => {
  return (
    <MockedCreateSubtaskProvider>
      <Story />
    </MockedCreateSubtaskProvider>
  );
};
