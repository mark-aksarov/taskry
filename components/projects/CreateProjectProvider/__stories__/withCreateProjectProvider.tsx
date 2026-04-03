import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateProjectProvider } from "./MockedCreateProjectProvider";

export const withCreateProjectProvider: Decorator = (Story) => {
  return (
    <MockedCreateProjectProvider>
      <Story />
    </MockedCreateProjectProvider>
  );
};
