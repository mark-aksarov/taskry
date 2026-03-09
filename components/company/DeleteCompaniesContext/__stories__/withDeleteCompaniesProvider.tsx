import { type Decorator } from "@storybook/react";
import { DeleteCompaniesProvider } from "../../DeleteCompaniesContext";

export const withDeleteCompaniesProvider: Decorator = (Story) => {
  return (
    <DeleteCompaniesProvider deleteCompanies={() => ({ status: "success" })}>
      <Story />
    </DeleteCompaniesProvider>
  );
};
