import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { ImportProjectCategoriesModal } from "./ImportProjectCategoriesModal";

const meta = {
  title: "dashboard/project-categories/ImportProjectCategoriesModal",
  component: ImportProjectCategoriesModal,
  decorators: [withOpenModal, withDashboardLayoutProviders],

  parameters: {
    modalId: "importProjectCategories",
  },
} satisfies Meta<typeof ImportProjectCategoriesModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
