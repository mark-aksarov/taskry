import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectStatusProvider } from "./MockedUpdateProjectStatusProvider";

export const withUpdateProjectStatusProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectStatusProvider>
      <Story />
    </MockedUpdateProjectStatusProvider>
  );
};
