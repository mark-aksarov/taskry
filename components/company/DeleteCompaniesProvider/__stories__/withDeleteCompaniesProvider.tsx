import { type Decorator } from "@storybook/react";
import { MockedDeleteCompaniesProvider } from "./MockedDeleteCompaniesProvider";

export const withDeleteCompaniesProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCompaniesProvider>
      <Story />
    </MockedDeleteCompaniesProvider>
  );
};
