import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeletePositionModal } from "./DeletePositionModal";
import { DeletePositionProvider } from "../DeletePositionContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/positions/DeletePositionModal",
  component: DeletePositionModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeletePositionProvider>
          <Story />
        </DeletePositionProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deletePosition",
  },
} satisfies Meta<typeof DeletePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Fake position",
  },
} satisfies Story;
