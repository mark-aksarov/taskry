import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdatePositionModal } from "./UpdatePositionModal";
import { useUpdatePositionModal } from "./UpdatePositionModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdatePositionProvider } from "../UpdatePositionProvider/__stories__";

const meta = {
  title: "components/positions/UpdatePositionModal",
  component: UpdatePositionModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useUpdatePositionModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdatePositionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UpdatePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Position 1",
  },
} satisfies Story;
