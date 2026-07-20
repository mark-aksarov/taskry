import { type Decorator } from "@storybook/nextjs-vite";
import { MockedImportCompaniesProvider } from "./MockedImportCompaniesProvider";

export const withImportCompaniesProvider: Decorator = (Story) => {
  return (
    <MockedImportCompaniesProvider>
      <Story />
    </MockedImportCompaniesProvider>
  );
};
