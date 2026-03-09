import { type Decorator } from "@storybook/react";
import { UpdateCompanyProvider } from "../UpdateCompanyContext";

export const withUpdateCompanyProvider: Decorator = (Story) => {
  return (
    <UpdateCompanyProvider updateCompany={() => ({ status: "success" })}>
      <Story />
    </UpdateCompanyProvider>
  );
};
