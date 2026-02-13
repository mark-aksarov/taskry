import React from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeletePositionsModal } from "./DeletePositionsModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/positions/DeletePositionsModal",
  component: DeletePositionsModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button label="Delete positions" onClick={() => setOpen(true)} />
        <DeletePositionsModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeletePositionsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionIds: [1, 2, 3],
    isOpen: false,
    onOpenChange: () => {},
    deletePositions: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithError = {
  args: {
    positionIds: [1, 2, 3],
    isOpen: false,
    onOpenChange: () => {},
    deletePositions: () => ({
      status: "error",
      errorCode: "validationError",
    }),
  },
} satisfies Story;
