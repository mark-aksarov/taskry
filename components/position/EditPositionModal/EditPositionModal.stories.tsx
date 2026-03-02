import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditPositionModal } from "./EditPositionModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/positions/EditPositionModal",
  component: EditPositionModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Edit position" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof EditPositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Position 1",
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
