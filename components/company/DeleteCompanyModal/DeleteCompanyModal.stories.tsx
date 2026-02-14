import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteCompanyModal } from "./DeleteCompanyModal";

const meta = {
  title: "components/companies/DeleteCompanyModal",
  component: DeleteCompanyModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button label="Delete company" onClick={() => setOpen(true)} />
        <DeleteCompanyModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteCompanyModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    companyName: "Project Manager",
    onOpenChange: () => {},
    deleteCompanies: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithError = {
  args: {
    ...Default.args,
    deleteCompanies: () => ({
      status: "error",
      errorCode: "validationError",
    }),
  },
} satisfies Story;
