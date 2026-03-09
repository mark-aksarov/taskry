import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { EditCompanyModal } from "./EditCompanyModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useUpdateCompany } from "../UpdateCompanyContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCompanyProvider } from "../UpdateCompanyContext/__stories__";

const meta = {
  title: "components/companies/EditCompanyModal",
  component: EditCompanyModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateCompany();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="Edit company"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withUpdateCompanyProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof EditCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    companyName: "Company 1",
  },
} satisfies Story;
