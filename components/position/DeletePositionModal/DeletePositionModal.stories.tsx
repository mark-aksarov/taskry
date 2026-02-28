import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeletePositionModal } from "./DeletePositionModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/positions/DeletePositionModal",
  component: DeletePositionModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete position" onClick={() => setOpen(true)} />
        <DeletePositionModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeletePositionModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Position 1",
    onOpenChange: () => {},
    deletePosition: () => ({ status: "success" }),
  },
} satisfies Story;
