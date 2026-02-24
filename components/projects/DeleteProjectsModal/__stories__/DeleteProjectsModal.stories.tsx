import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteProjectsModal } from "../DeleteProjectsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/DeleteProjectsModal",
  component: DeleteProjectsModal,
  decorators: [withThemedBackground],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete projects" onClick={() => setOpen(true)} />
        <DeleteProjectsModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteProjectsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectIds: [1, 2, 3],
    deleteProjects: () => ({ status: "success" }),
  },
} satisfies Story;
