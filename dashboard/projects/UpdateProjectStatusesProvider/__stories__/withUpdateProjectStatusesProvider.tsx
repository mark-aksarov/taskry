import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectStatusesProvider } from "./MockedUpdateProjectStatusesProvider";

export const withUpdateProjectStatusesProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectStatusesProvider>
      <Story />
    </MockedUpdateProjectStatusesProvider>
  );
};
