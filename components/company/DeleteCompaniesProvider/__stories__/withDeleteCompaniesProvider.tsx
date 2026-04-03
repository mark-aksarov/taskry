import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteCompaniesProvider } from "./MockedDeleteCompaniesProvider";

export const withDeleteCompaniesProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCompaniesProvider>
      <Story />
    </MockedDeleteCompaniesProvider>
  );
};
