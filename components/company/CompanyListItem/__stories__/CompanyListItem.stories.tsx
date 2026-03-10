import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "../CompanyListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCompaniesProvider } from "../../DeleteCompaniesContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/companies/CompanyListItem",
  component: CompanyListItem,
  decorators: [
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CompanyListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Company 1",
    updateCompany: () => ({ status: "success" }),
    deleteCompany: () => ({ status: "success" }),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
