import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectDeadlineProvider } from "./MockedUpdateProjectDeadlineProvider";

export const withUpdateProjectDeadlineProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectDeadlineProvider>
      <Story />
    </MockedUpdateProjectDeadlineProvider>
  );
};
