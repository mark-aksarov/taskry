import { DemoDataModal } from "./DemoDataModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/demoData/DemoDataModal",
  component: DemoDataModal,
  decorators: [withOpenModal, withDashboardLayoutProviders],

  parameters: {
    modalId: "demoData",
  },
} satisfies Meta<typeof DemoDataModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
