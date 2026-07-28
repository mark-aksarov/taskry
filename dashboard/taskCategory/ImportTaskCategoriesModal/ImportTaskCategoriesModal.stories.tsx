import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportTaskCategoriesModal } from "./ImportTaskCategoriesModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/task-categories/ImportTaskCategoriesModal",
  component: ImportTaskCategoriesModal,
  decorators: [withOpenModal, withDashboardLayoutProviders],

  parameters: {
    modalId: "importTaskCategories",
  },
} satisfies Meta<typeof ImportTaskCategoriesModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
