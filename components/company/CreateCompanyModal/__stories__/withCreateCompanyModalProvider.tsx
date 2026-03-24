import { type Decorator } from "@storybook/react";
import { CreateCompanyModalProvider } from "../CreateCompanyModalContext";

export const withCreateCompanyModalProvider: Decorator = (Story) => {
  return (
    <CreateCompanyModalProvider>
      <Story />
    </CreateCompanyModalProvider>
  );
};
