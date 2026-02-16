import { type Decorator } from "@storybook/react";
import { DeleteCompanyModalProvider } from "../DeleteCompanyModalContext";

export const withDeleteCompanyModalProvider: Decorator = (Story) => {
  return (
    <DeleteCompanyModalProvider deleteCompanies={() => ({ status: "success" })}>
      <Story />
    </DeleteCompanyModalProvider>
  );
};
