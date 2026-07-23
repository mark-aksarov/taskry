import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteClientsProvider } from "./MockedDeleteClientsProvider";

export const withDeleteClientsProvider: Decorator = (Story) => {
  return (
    <MockedDeleteClientsProvider>
      <Story />
    </MockedDeleteClientsProvider>
  );
};
