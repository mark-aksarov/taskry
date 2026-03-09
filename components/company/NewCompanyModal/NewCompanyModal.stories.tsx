import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { NewCompanyModal } from "./NewCompanyModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useCreateCompany } from "../CreateCompanyContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateCompanyProvider } from "../CreateCompanyContext/__stories__";

const meta = {
  title: "components/companies/NewCompanyModal",
  component: NewCompanyModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useCreateCompany();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button label="New company" onClick={() => onModalOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateCompanyProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof NewCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
