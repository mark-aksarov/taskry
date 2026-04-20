import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectStatusAltProvider } from "./MockedUpdateProjectStatusAltProvider";

export const withUpdateProjectStatusAltProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectStatusAltProvider>
      <Story />
    </MockedUpdateProjectStatusAltProvider>
  );
};
