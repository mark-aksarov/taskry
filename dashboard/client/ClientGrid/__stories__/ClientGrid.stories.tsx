import { ClientGridExample } from "./ClientGridExample";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { DeleteClientsProvider } from "../../DeleteClientsContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/ClientGrid",
  component: ClientGridExample,
  decorators: [
    (Story) => (
      <ViewModeProvider initialValue="grid">
        <SelectedItemsProvider pageItems={[]}>
          <DeleteClientsProvider>
            <Story />
          </DeleteClientsProvider>
        </SelectedItemsProvider>
      </ViewModeProvider>
    ),
    withDashboardLayoutProviders,
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
