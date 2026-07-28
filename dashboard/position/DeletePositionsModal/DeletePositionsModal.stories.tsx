import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeletePositionsModal } from "./DeletePositionsModal";
import { DeletePositionsProvider } from "../DeletePositionsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";

const meta = {
  title: "dashboard/positions/DeletePositionsModal",
  component: DeletePositionsModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeletePositionsProvider>
          <Story />
        </DeletePositionsProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deletePositions",
  },
} satisfies Meta<typeof DeletePositionsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
