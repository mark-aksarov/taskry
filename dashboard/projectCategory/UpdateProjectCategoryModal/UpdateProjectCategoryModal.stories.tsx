import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectCategoryModal } from "./UpdateProjectCategoryModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateProjectCategoryProvider } from "../UpdateProjectCategoryContext";

const meta = {
  title: "dashboard/project-categories/UpdateProjectCategoryModal",
  component: UpdateProjectCategoryModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateProjectCategoryProvider>
        <Story />
      </UpdateProjectCategoryProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateProjectCategory",
  },
} satisfies Meta<typeof UpdateProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Project Category 1",
  },
} satisfies Story;
