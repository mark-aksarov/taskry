import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectForm } from "../UpdateProjectForm";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { useUpdateProjectModal } from "./UpdateProjectModalContext";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withUpdateProjectProvider } from "../UpdateProjectProvider/__stories__";

const meta = {
  title: "components/projects/UpdateProjectModal",
  component: UpdateProjectModal,
  decorators: [
    (Story) => {
      const { onOpenChange: onModalOpenChange } = useUpdateProjectModal();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="Edit project"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withUpdateProjectProvider,
    withThemedBackground,
  ],
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
