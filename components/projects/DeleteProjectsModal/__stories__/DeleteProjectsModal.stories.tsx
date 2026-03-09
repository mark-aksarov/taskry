import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteProjectsModal } from "../DeleteProjectsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsContext/__stories__";

const meta = {
  title: "components/projects/DeleteProjectsModal",
  component: DeleteProjectsModal,
  decorators: [
    withDeleteProjectsProvider,
    withSelectedProjectsProvider,
    withThemedBackground,
  ],
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
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
