import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeletePositionModal } from "../DeletePositionModal";
import { useDeletePositionModal } from "../DeletePositionModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeletePositionModalProvider } from "./withDeletePositionModalProvider";
import { withDeletePositionProvider } from "../../DeletePositionProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/positions/DeletePositionModal",
  component: DeletePositionModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useDeletePositionModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withDeletePositionProvider,
    withDeletePositionModalProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof DeletePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Position 1",
  },
} satisfies Story;
