import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreatePositionModal } from "./CreatePositionModal";
import { withCreatePositionModalProvider } from "./__stories__";
import { useCreatePositionModal } from "./CreatePositionModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreatePositionProvider } from "../CreatePositionProvider/__stories__";

const meta = {
  title: "components/positions/CreatePositionModal",
  component: CreatePositionModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCreatePositionModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreatePositionProvider,
    withCreatePositionModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreatePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createPosition: () => ({ status: "success" }),
  },
} satisfies Story;
