import { type Decorator } from "@storybook/react";
import { MockedCreateCompanyProvider } from "./MockedCreateCompanyProvider";

export const withCreateCompanyProvider: Decorator = (Story) => {
  return (
    <MockedCreateCompanyProvider>
      <Story />
    </MockedCreateCompanyProvider>
  );
};
