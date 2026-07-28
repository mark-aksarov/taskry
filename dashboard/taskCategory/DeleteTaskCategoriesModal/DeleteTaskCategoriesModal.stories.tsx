import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteTaskCategoriesModal } from "./DeleteTaskCategoriesModal";
import { DeleteTaskCategoriesProvider } from "../DeleteTaskCategoriesContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/task-categories/DeleteTaskCategoriesModal",
  component: DeleteTaskCategoriesModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteTaskCategoriesProvider>
          <Story />
        </DeleteTaskCategoriesProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "deleteTaskCategories",
  },
} satisfies Meta<typeof DeleteTaskCategoriesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
