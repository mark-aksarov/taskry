import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskProjectProvider } from "./MockedUpdateTaskProjectProvider";

export const withUpdateTaskProjectProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskProjectProvider>
      <Story />
    </MockedUpdateTaskProjectProvider>
  );
};
