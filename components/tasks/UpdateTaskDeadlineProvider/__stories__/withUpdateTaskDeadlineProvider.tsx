import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskDeadlineProvider } from "./MockedUpdateTaskDeadlineProvider";

export const withUpdateTaskDeadlineProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskDeadlineProvider>
      <Story />
    </MockedUpdateTaskDeadlineProvider>
  );
};
