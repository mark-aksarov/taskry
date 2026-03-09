import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditPositionModal } from "./EditPositionModal";
import { useUpdatePosition } from "../UpdatePositionContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdatePositionProvider } from "../UpdatePositionContext/__stories__";

const meta = {
  title: "components/positions/EditPositionModal",
  component: EditPositionModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdatePosition();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="Edit position"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withUpdatePositionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof EditPositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Position 1",
  },
} satisfies Story;
