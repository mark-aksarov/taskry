import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportProjectsModal } from "./ImportProjectsModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/ImportProjectsModal",
  component: ImportProjectsModal,
  decorators: [withOpenModal, withDashboardLayoutProviders],

  parameters: {
    modalId: "importProjects",
  },
} satisfies Meta<typeof ImportProjectsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
