import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyToolbarActionsMenuTrigger } from "../CompanyToolbarActionsMenuTrigger";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/companies/CompanyToolbarActionsMenuTrigger",
  component: CompanyToolbarActionsMenuTrigger,
  decorators: [withSelectedItemsProvider, withThemedBackground],
} satisfies Meta<typeof CompanyToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deleteCompanies: () => ({ status: "success" }),
  },
} satisfies Story;
