import {
  UpdateProjectCategoryRelForm,
  UpdateProjectCategoryRelFormSkeleton,
} from "../UpdateProjectCategoryRelForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { UpdateProjectCategoryRelModal } from "./UpdateProjectCategoryRelModal";
import { UpdateProjectCategoryRelProvider } from "../UpdateProjectCategoryRelContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/UpdateProjectCategoryRelModal",
  component: UpdateProjectCategoryRelModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateProjectCategoryRelProvider>
        <Story />
      </UpdateProjectCategoryRelProvider>
    ),
    withDashboardLayoutProviders,
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
