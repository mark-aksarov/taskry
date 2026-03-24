import { type Decorator } from "@storybook/react";
import { MockedUpdateCompanyProvider } from "./MockedUpdateCompanyProvider";

export const withUpdateCompanyProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCompanyProvider>
      <Story />
    </MockedUpdateCompanyProvider>
  );
};
