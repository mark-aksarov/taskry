import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteProjectCategoriesModal } from "./DeleteProjectCategoriesModal";
import { DeleteProjectCategoriesProvider } from "../DeleteProjectCategoriesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";

const meta = {
  title: "dashboard/project-categories/DeleteProjectCategoriesModal",
  component: DeleteProjectCategoriesModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteProjectCategoriesProvider>
          <Story />
        </DeleteProjectCategoriesProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteProjectCategories",
  },
} satisfies Meta<typeof DeleteProjectCategoriesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
