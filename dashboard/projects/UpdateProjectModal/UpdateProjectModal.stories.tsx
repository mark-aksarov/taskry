import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientSummaries } from "@/mocks/clients";
import { UpdateProjectForm } from "../UpdateProjectForm";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { UpdateProjectProvider } from "../UpdateProjectContext";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/UpdateProjectModal",
  component: UpdateProjectModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateProjectProvider>
        <Story />
      </UpdateProjectProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateProject",
  },
} satisfies Meta<typeof UpdateProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateProjectFormContainer: (
      <UpdateProjectForm
        {...mockedProject}
        projectId={mockedProject.id}
        projectCategorySelectItems={mockedProjectCategorySummaries}
        clientSelectItems={mockedClientSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    updateProjectFormContainer: <ProjectFormSkeleton />,
  },
} satisfies Story;
