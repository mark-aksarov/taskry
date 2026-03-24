import { type Decorator } from "@storybook/react";
import { UpdateCompanyModalProvider } from "../UpdateCompanyModalContext";

export const withUpdateCompanyModalProvider: Decorator = (Story) => {
  return (
    <UpdateCompanyModalProvider>
      <Story />
    </UpdateCompanyModalProvider>
  );
};
