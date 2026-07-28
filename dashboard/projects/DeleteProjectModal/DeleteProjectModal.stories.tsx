import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { DeleteProjectProvider } from "../DeleteProjectContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";

const meta = {
  title: "dashboard/projects/DeleteProjectModal",
  component: DeleteProjectModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedProjectsProvider pageItems={[]}>
        <DeleteProjectProvider>
          <Story />
        </DeleteProjectProvider>
      </SelectedProjectsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteProject",
  },
} satisfies Meta<typeof DeleteProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: 1,
    projectTitle: "Project 1",
  },
} satisfies Story;
