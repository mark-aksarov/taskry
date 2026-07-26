import { CompanyGrid } from "../CompanyGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyGridExample } from "./CompanyGridExample";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCompaniesProvider } from "../../DeleteCompaniesProvider/__stories__";
import { withSessionProvider } from "@/common/SessionContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/companies/CompanyGrid",
  component: CompanyGrid,
  decorators: [
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    withSessionProvider,
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
