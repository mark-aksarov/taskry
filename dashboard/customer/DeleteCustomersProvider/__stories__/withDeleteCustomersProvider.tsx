import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteCustomersProvider } from "./MockedDeleteCustomersProvider";

export const withDeleteCustomersProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCustomersProvider>
      <Story />
    </MockedDeleteCustomersProvider>
  );
};
