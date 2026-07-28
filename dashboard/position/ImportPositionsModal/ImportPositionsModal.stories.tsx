import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportPositionsModal } from "./ImportPositionsModal";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/positions/ImportPositionsModal",
  component: ImportPositionsModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <ModalManagerProvider>
        <Story />
      </ModalManagerProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "importPositions",
  },
} satisfies Meta<typeof ImportPositionsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
