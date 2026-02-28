import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteProjectModal } from "../DeleteProjectModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/DeleteProjectModal",
  component: DeleteProjectModal,
  decorators: [withThemedBackground],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete project" onClick={() => setOpen(true)} />
        <DeleteProjectModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteProjectModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: 1,
    projectTitle: "Project 1",
    onOpenChange: () => {},
    deleteProject: () => ({ status: "success" }),
  },
} satisfies Story;
