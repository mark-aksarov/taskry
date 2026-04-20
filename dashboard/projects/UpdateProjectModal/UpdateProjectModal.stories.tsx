import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectForm } from "../UpdateProjectForm";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withUpdateProjectProvider } from "../UpdateProjectProvider/__stories__";

const meta = {
  title: "dashboard/projects/UpdateProjectModal",
  component: UpdateProjectModal,
  decorators: [
    withOpenModal,
    withUpdateProjectProvider,
    withModalManagerProvider,
    withThemedBackground,
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
        customerSelectItems={mockedCustomerSummaries}
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
