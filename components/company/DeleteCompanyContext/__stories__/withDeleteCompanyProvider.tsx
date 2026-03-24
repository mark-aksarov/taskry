import { type Decorator } from "@storybook/react";
import { MockedDeleteCompanyProvider } from "./MockedDeleteCompanyProvider";

export const withDeleteCompanyProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCompanyProvider>
      <Story />
    </MockedDeleteCompanyProvider>
  );
};
