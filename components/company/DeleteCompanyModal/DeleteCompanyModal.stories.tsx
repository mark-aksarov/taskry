import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteCompanyModal } from "../DeleteCompanyModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCompanyProvider } from "../DeleteCompanyProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/companies/DeleteCompanyModal",
  component: DeleteCompanyModal,
  decorators: [
    withDeleteCompanyProvider,
    withSelectedItemsProvider,
    withToastRegion,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = useState(true);

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
    companyName: "Company 1",
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
