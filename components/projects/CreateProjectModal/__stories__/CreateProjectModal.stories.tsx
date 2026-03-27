import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateProjectModal } from "../CreateProjectModal";
import { CreateProjectForm } from "../../CreateProjectForm";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { ProjectFormSkeleton } from "../../ProjectFormSkeleton";
import { useCreateProjectModal } from "../CreateProjectModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withCreateProjectProvider } from "../../CreateProjectProvider/__stories__";
import { withCreateProjectModalProvider } from "./withCreateProjectModalProvider";

const meta = {
  title: "components/projects/CreateProjectModal",
  component: CreateProjectModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCreateProjectModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateProjectProvider,
    withCreateProjectModalProvider,
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
