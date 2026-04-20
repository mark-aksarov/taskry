import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskStatusAltProvider } from "./MockedUpdateTaskStatusAltProvider";

export const withUpdateTaskStatusAltProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskStatusAltProvider>
      <Story />
    </MockedUpdateTaskStatusAltProvider>
  );
};
