import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskAssigneeProvider } from "./MockedUpdateTaskAssigneeProvider";

export const withUpdateTaskAssigneeProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskAssigneeProvider>
      <Story />
    </MockedUpdateTaskAssigneeProvider>
  );
};
