import { type Decorator } from "@storybook/react";
import { MockedUpdateProjectStatusProvider } from "./MockedUpdateProjectStatusProvider";

export const withUpdateProjectStatusProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectStatusProvider>
      <Story />
    </MockedUpdateProjectStatusProvider>
  );
};
