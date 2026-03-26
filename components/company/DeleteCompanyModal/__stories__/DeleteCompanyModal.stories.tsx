import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCompanyModal } from "../DeleteCompanyModal";
import { useDeleteCompanyModal } from "../DeleteCompanyModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCompanyModalProvider } from "./withDeleteCompanyModalProvider";
import { withDeleteCompanyProvider } from "../../DeleteCompanyProvider/__stories__";

const meta = {
  title: "components/companies/DeleteCompanyModal",
  component: DeleteCompanyModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useDeleteCompanyModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withDeleteCompanyProvider,
    withDeleteCompanyModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof DeleteCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    companyName: "Company 1",
  },
} satisfies Story;
