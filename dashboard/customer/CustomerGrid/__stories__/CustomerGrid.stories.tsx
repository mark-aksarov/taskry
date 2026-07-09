import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerGridExample } from "./CustomerGridExample";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/customers/CustomerGrid",
  component: CustomerGridExample,
  decorators: [
    withDeleteCustomersProvider,
    withViewModeProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <DashboardGrid>
      <CustomerGridExample />
    </DashboardGrid>
  ),
} satisfies Story;
