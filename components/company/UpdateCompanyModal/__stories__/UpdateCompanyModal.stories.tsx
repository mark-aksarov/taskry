import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateCompanyModal } from "../UpdateCompanyModal";
import { useUpdateCompanyModal } from "../UpdateCompanyModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCompanyModalProvider } from "./withUpdateCompanyModalProvider";
import { withUpdateCompanyProvider } from "../../UpdateCompanyProvider/__stories__";

const meta = {
  title: "components/companies/UpdateCompanyModal",
  component: UpdateCompanyModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useUpdateCompanyModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdateCompanyProvider,
    withUpdateCompanyModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UpdateCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    companyName: "Company 1",
  },
} satisfies Story;
