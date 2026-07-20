import { type Decorator } from "@storybook/nextjs-vite";
import { MockedImportProjectsProvider } from "./MockedImportProjectsProvider";

export const withImportProjectsProvider: Decorator = (Story) => {
  return (
    <MockedImportProjectsProvider>
      <Story />
    </MockedImportProjectsProvider>
  );
};
