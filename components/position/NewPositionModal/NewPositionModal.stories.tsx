import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { NewPositionModal } from "./NewPositionModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useCreatePosition } from "../CreatePositionContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreatePositionProvider } from "../CreatePositionContext/__stories__";

const meta = {
  title: "components/positions/NewPositionModal",
  component: NewPositionModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useCreatePosition();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="New Position"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withCreatePositionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof NewPositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createPosition: () => ({ status: "success" }),
  },
} satisfies Story;
