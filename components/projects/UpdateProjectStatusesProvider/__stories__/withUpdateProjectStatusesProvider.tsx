import { type Decorator } from "@storybook/react";
import { MockedUpdateProjectStatusesProvider } from "./MockedUpdateProjectStatusesProvider";

export const withUpdateProjectStatusesProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectStatusesProvider>
      <Story />
    </MockedUpdateProjectStatusesProvider>
  );
};
