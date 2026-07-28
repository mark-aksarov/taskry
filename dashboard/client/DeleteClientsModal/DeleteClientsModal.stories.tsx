import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteClientsModal } from "./DeleteClientsModal";
import { DeleteClientsProvider } from "../DeleteClientsContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/DeleteClientsModal",
  component: DeleteClientsModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteClientsProvider>
          <Story />
        </DeleteClientsProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteClients",
  },
} satisfies Meta<typeof DeleteClientsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
