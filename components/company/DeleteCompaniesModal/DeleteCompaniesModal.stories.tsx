import React from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteCompaniesModal } from "./DeleteCompaniesModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/companies/DeleteCompaniesModal",
  component: DeleteCompaniesModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button label="Delete companies" onClick={() => setOpen(true)} />
        <DeleteCompaniesModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteCompaniesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyIds: [1, 2, 3],
    isOpen: false,
    onOpenChange: () => {},
    deleteCompanies: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithError = {
  args: {
    companyIds: [1, 2, 3],
    isOpen: false,
    onOpenChange: () => {},
    deleteCompanies: () => ({
      status: "error",
      errorCode: "validationError",
    }),
  },
} satisfies Story;
