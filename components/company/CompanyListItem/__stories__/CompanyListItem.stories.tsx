import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "../CompanyListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCompanyProviders } from "../../CompanyProviders/__stories__";
import { withDeleteCompanyModal } from "../../DeleteCompanyModal/__stories__";
import { withUpdateCompanyModal } from "../../UpdateCompanyModal/__stories__";
import { withDeleteCompaniesProvider } from "../../DeleteCompaniesProvider/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/companies/CompanyListItem",
  component: CompanyListItem,
  decorators: [
    // we open DeleteCompanyModal and UpdateCompanyModal from CompanyListItemActionMenuTrigger
    withDeleteCompanyModal,
    withUpdateCompanyModal,

    // mocking company item providers
    withCompanyProviders,

    // mocking another providers
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
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
