import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteProjectModal } from "../DeleteProjectModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { useDeleteProjectModal } from "../DeleteProjectModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteProjectModalProvider } from "./withDeleteProjectModalProvider";
import { withDeleteProjectProvider } from "../../DeleteProjectProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/projects/DeleteProjectModal",
  component: DeleteProjectModal,
  decorators: [
    withDeleteProjectModalProvider,
    withToastRegion,
    withDeleteProjectProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
  render: (args) => {
    const { onOpenChange } = useDeleteProjectModal();

    useEffect(() => onOpenChange(true), [onOpenChange]);

    return (
      <>
        <Button label="Open modal" onClick={() => onOpenChange(true)} />
        <DeleteProjectModal {...args} />
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
  },
} satisfies Story;
