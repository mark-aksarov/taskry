import { type Decorator } from "@storybook/react";
import { UpdateCompanyModal } from "../UpdateCompanyModal";

export const withUpdateCompanyModal: Decorator = (Story) => {
  return (
    <>
      <Story />
      <UpdateCompanyModal companyId={1} companyName="Company 1" />
    </>
  );
};
