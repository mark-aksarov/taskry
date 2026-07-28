import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreatePositionModal } from "./CreatePositionModal";
import { CreatePositionProvider } from "../CreatePositionContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/positions/CreatePositionModal",
  component: CreatePositionModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreatePositionProvider>
        <Story />
      </CreatePositionProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "createPosition",
  },
} satisfies Meta<typeof CreatePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
