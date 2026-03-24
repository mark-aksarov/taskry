import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateCompanyModal } from "./CreateCompanyModal";
import { withCreateCompanyModalProvider } from "./__stories__";
import { useCreateCompanyModal } from "./CreateCompanyModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/companies/CreateCompanyModal",
  component: CreateCompanyModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCreateCompanyModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateCompanyModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreateCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
