import { type Decorator } from "@storybook/react";
import { DeleteCompanyProvider } from "../DeleteCompanyContext";

export const withDeleteCompanyProvider: Decorator = (Story) => {
  return (
    <DeleteCompanyProvider deleteCompany={() => ({ status: "success" })}>
      <Story />
    </DeleteCompanyProvider>
  );
};
