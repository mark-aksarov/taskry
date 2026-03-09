import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { EditProjectForm } from "../EditProjectForm";
import { EditProjectModal } from "./EditProjectModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useUpdateProject } from "../UpdateProjectContext";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { editProjectFormArgs } from "../EditProjectForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateProjectProvider } from "../UpdateProjectContext/__stories__";

const meta = {
  title: "components/projects/EditProjectModal",
  component: EditProjectModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateProject();

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
} satisfies Meta<typeof EditProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editProjectFormContainer: <EditProjectForm {...editProjectFormArgs} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    editProjectFormContainer: <ProjectFormSkeleton />,
  },
} satisfies Story;
