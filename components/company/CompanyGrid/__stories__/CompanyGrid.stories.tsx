import { CompanyGrid } from "../CompanyGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyGridExample } from "./CompanyGridExample";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCompaniesProvider } from "../../DeleteCompaniesProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/companies/CompanyGrid",
  component: CompanyGrid,
  decorators: [
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CompanyGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <CompanyGridExample />,
  },
} satisfies Story;
