import { type Decorator } from "@storybook/react";
import { MockedUpdateProjectProvider } from "./MockedUpdateProjectProvider";

export const withUpdateProjectProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectProvider>
      <Story />
    </MockedUpdateProjectProvider>
  );
};
