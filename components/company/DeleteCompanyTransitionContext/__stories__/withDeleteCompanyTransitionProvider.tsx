import { type Decorator } from "@storybook/react";
import { DeleteCompanyTransitionProvider } from "../DeleteCompanyTransitionContext";

export const withDeleteCompanyTransitionProvider: Decorator = (Story) => {
  return (
    <DeleteCompanyTransitionProvider>
      <Story />
    </DeleteCompanyTransitionProvider>
  );
};
