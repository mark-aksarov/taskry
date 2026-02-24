import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { NewProjectForm } from "../NewProjectForm";
import { NewProjectModal } from "./NewProjectModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { newProjectFormArgs } from "../NewProjectForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/NewProjectModal",
  component: NewProjectModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="New project" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof NewProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newProjectFormContainer: <NewProjectForm {...newProjectFormArgs} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectFormContainer: <ProjectFormSkeleton />,
  },
} satisfies Story;
