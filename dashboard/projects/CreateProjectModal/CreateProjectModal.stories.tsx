import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateProjectModal } from "../CreateProjectModal";
import { CreateProjectForm } from "../CreateProjectForm";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withCreateProjectProvider } from "../CreateProjectProvider/__stories__";

const meta = {
  title: "dashboard/projects/CreateProjectModal",
  component: CreateProjectModal,
  decorators: [
    withOpenModal,
    withCreateProjectProvider,
    withModalManagerProvider,
    withThemedBackground,
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
        customerSelectItems={mockedCustomerSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    createProjectFormContainer: <ProjectFormSkeleton />,
  },
} satisfies Story;
