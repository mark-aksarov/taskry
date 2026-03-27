import { type Decorator } from "@storybook/react";
import { ProjectCustomerFiltersModalProvider } from "../ProjectCustomerFiltersModalContext";

export const withProjectCustomerFiltersModalProvider: Decorator = (Story) => {
  return (
    <ProjectCustomerFiltersModalProvider>
      <Story />
    </ProjectCustomerFiltersModalProvider>
  );
};
