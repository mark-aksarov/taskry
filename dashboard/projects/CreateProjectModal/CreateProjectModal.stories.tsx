import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientSummaries } from "@/mocks/clients";
import { CreateProjectForm } from "../CreateProjectForm";
import { CreateProjectModal } from "../CreateProjectModal";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { CreateProjectProvider } from "../CreateProjectContext";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/CreateProjectModal",
  component: CreateProjectModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreateProjectProvider>
        <Story />
      </CreateProjectProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "createProject",
  },
} satisfies Meta<typeof CreateProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createProjectFormContainer: (
      <CreateProjectForm
        projectCategorySelectItems={mockedProjectCategorySummaries}
        clientSelectItems={mockedClientSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    createProjectFormContainer: <ProjectFormSkeleton />,
  },
} satisfies Story;
