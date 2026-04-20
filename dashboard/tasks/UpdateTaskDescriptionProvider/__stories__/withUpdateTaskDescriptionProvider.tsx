import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskDescriptionProvider } from "./MockedUpdateTaskDescriptionProvider";

export const withUpdateTaskDescriptionProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskDescriptionProvider>
      <Story />
    </MockedUpdateTaskDescriptionProvider>
  );
};
