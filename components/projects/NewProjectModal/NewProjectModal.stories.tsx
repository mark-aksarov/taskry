import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { NewProjectForm } from "../NewProjectForm";
import { NewProjectModal } from "./NewProjectModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useCreateProject } from "../CreateProjectContext";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withCreateProjectProvider } from "../CreateProjectContext/__stories__";

const meta = {
  title: "components/projects/NewProjectModal",
  component: NewProjectModal,
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
} satisfies Meta<typeof NewProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newProjectFormContainer: (
      <NewProjectForm
        projectCategorySelectItems={mockedProjectCategorySummaries}
        customerSelectItems={mockedCustomerSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectFormContainer: <ProjectFormSkeleton />,
  },
} satisfies Story;
