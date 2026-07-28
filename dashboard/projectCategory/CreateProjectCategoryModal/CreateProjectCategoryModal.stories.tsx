import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateProjectCategoryModal } from "../CreateProjectCategoryModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { CreateProjectCategoryProvider } from "../CreateProjectCategoryContext";

const meta = {
  title: "dashboard/project-categories/CreateProjectCategoryModal",
  component: CreateProjectCategoryModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreateProjectCategoryProvider>
        <Story />
      </CreateProjectCategoryProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "createProjectCategory",
  },
} satisfies Meta<typeof CreateProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
