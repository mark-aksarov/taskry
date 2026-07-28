import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteProjectCategoryModal } from "../DeleteProjectCategoryModal";
import { DeleteProjectCategoryProvider } from "../DeleteProjectCategoryContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/project-categories/DeleteProjectCategoryModal",
  component: DeleteProjectCategoryModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteProjectCategoryProvider>
          <Story />
        </DeleteProjectCategoryProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteProjectCategory",
  },
} satisfies Meta<typeof DeleteProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Fake project category",
  },
} satisfies Story;
