import { type Decorator } from "@storybook/react";
import { CreateCompanyProvider } from "../../CreateCompanyContext";

export const withCreateCompanyProvider: Decorator = (Story) => {
  return (
    <CreateCompanyProvider createCompany={() => ({ status: "success" })}>
      <Story />
    </CreateCompanyProvider>
  );
};
