import { type Decorator } from "@storybook/nextjs-vite";
import { MockedImportClientsProvider } from "./MockedImportClientsProvider";

export const withImportClientsProvider: Decorator = (Story) => {
  return (
    <MockedImportClientsProvider>
      <Story />
    </MockedImportClientsProvider>
  );
};
