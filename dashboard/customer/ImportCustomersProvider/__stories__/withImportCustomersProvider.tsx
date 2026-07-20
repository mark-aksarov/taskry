import { type Decorator } from "@storybook/nextjs-vite";
import { MockedImportCustomersProvider } from "./MockedImportCustomersProvider";

export const withImportCustomersProvider: Decorator = (Story) => {
  return (
    <MockedImportCustomersProvider>
      <Story />
    </MockedImportCustomersProvider>
  );
};
