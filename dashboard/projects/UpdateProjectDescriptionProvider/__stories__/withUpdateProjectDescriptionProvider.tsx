import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectDescriptionProvider } from "./MockedUpdateProjectDescriptionProvider";

export const withUpdateProjectDescriptionProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectDescriptionProvider>
      <Story />
    </MockedUpdateProjectDescriptionProvider>
  );
};
