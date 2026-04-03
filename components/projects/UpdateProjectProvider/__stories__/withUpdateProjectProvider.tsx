import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectProvider } from "./MockedUpdateProjectProvider";

export const withUpdateProjectProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectProvider>
      <Story />
    </MockedUpdateProjectProvider>
  );
};
