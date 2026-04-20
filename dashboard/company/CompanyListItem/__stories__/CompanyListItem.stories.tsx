import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyListItem } from "../CompanyListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCompanyProvider } from "../../UpdateCompanyProvider/__stories__";
import { withDeleteCompanyProvider } from "../../DeleteCompanyProvider/__stories__";
import { withDeleteCompaniesProvider } from "../../DeleteCompaniesProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/companies/CompanyListItem",
  component: CompanyListItem,
  decorators: [
    withUpdateCompanyProvider,
    withDeleteCompanyProvider,

    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    withModalManagerProvider,

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
