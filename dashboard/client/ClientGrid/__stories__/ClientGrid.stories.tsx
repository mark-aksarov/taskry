import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientGridExample } from "./ClientGridExample";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withSessionProvider } from "@/common/SessionContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withDeleteClientsProvider } from "../../DeleteClientsProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/clients/ClientGrid",
  component: ClientGridExample,
  decorators: [
    withDeleteClientsProvider,
    withViewModeProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withSessionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ClientGridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <DashboardGrid>
      <ClientGridExample />
    </DashboardGrid>
  ),
} satisfies Story;
