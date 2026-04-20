import {
  UpdateProjectCategoryRelForm,
  UpdateProjectCategoryRelFormSkeleton,
} from "../UpdateProjectCategoryRelForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { UpdateProjectCategoryRelModal } from "./UpdateProjectCategoryRelModal";
import { withUpdateProjectCategoryRelProvider } from "../UpdateProjectCategoryRelProvider/__stories__";

const meta = {
  title: "components/projects/UpdateProjectCategoryRelModal",
  component: UpdateProjectCategoryRelModal,
  decorators: [
    withOpenModal,
    withUpdateProjectCategoryRelProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateProjectCategoryRel",
  },
} satisfies Meta<typeof UpdateProjectCategoryRelModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateProjectCategoryRelFormContainer: (
      <UpdateProjectCategoryRelForm
        projectId={mockedProject.id}
        categoryId={mockedProject.category.id}
        projectCategorySelectItems={mockedProjectCategorySummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateProjectCategoryRelFormContainer: (
      <UpdateProjectCategoryRelFormSkeleton />
    ),
  },
} satisfies Story;
