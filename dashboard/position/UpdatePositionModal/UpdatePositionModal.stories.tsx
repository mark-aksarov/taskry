import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdatePositionModal } from "./UpdatePositionModal";
import { UpdatePositionProvider } from "../UpdatePositionContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/positions/UpdatePositionModal",
  component: UpdatePositionModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdatePositionProvider>
        <Story />
      </UpdatePositionProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updatePosition",
  },
} satisfies Meta<typeof UpdatePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Position 1",
  },
} satisfies Story;
