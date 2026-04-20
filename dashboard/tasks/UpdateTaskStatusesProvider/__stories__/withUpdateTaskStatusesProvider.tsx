import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskStatusesProvider } from "./MockedUpdateTaskStatusesProvider";

export const withUpdateTaskStatusesProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskStatusesProvider>
      <Story />
    </MockedUpdateTaskStatusesProvider>
  );
};
