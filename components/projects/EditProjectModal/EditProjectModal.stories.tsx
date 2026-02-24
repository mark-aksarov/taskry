import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EditProjectForm } from "../EditProjectForm";
import { EditProjectModal } from "./EditProjectModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { editProjectFormArgs } from "../EditProjectForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/EditProjectModal",
  component: EditProjectModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Edit project" />
          <Story />
        </DialogTrigger>
      );
    },
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
