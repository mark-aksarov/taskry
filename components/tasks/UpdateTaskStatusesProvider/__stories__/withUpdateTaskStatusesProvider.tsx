import { type Decorator } from "@storybook/react";
import { MockedUpdateTaskStatusesProvider } from "./MockedUpdateTaskStatusesProvider";

export const withUpdateTaskStatusesProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskStatusesProvider>
      <Story />
    </MockedUpdateTaskStatusesProvider>
  );
};
