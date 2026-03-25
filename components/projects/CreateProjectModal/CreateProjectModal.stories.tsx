import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CreateProjectForm } from "../CreateProjectForm";
import { CreateProjectModal } from "./CreateProjectModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useCreateProject } from "../CreateProjectContext";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withCreateProjectProvider } from "../CreateProjectContext/__stories__";

const meta = {
  title: "components/projects/CreateProjectModal",
  component: CreateProjectModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useCreateProject();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button label="New project" onClick={() => onModalOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateProjectProvider,
    withThemedBackground,
  ],
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
