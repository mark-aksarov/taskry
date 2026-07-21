import { type Decorator } from "@storybook/nextjs-vite";
import { MockedImportPositionsProvider } from "./MockedImportPositionsProvider";

export const withImportPositionsProvider: Decorator = (Story) => {
  return (
    <MockedImportPositionsProvider>
      <Story />
    </MockedImportPositionsProvider>
  );
};
