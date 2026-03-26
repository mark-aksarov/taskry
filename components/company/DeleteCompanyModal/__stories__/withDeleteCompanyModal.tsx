import { type Decorator } from "@storybook/react";
import { DeleteCompanyModal } from "../DeleteCompanyModal";

export const withDeleteCompanyModal: Decorator = (Story) => {
  return (
    <>
      <Story />
      <DeleteCompanyModal companyId={1} companyName="Company 1" />
    </>
  );
};
