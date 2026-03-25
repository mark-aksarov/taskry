import { type Decorator } from "@storybook/react";
import { MockedCompanyProviders } from "./MockedCompanyProviders";

export const withCompanyProviders: Decorator = (Story) => {
  return (
    <MockedCompanyProviders>
      <Story />
    </MockedCompanyProviders>
  );
};
