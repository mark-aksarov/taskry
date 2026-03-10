import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { GuestModeModal } from "../GuestModeModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useGuestModeModal } from "../GuestModeModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withGuestModeModalProvider } from "./withGuestModeModalProvider";

const meta = {
  title: "components/common/GuestModeModal",
  component: GuestModeModal,
  decorators: [withGuestModeModalProvider, withThemedBackground],
  render: () => {
    const { onOpenChange } = useGuestModeModal();

    useEffect(() => onOpenChange(true), [onOpenChange]);

    return (
      <>
        <Button label="Guest modal" onPress={() => onOpenChange(true)} />
        <GuestModeModal />
      </>
    );
  },
} satisfies Meta<typeof GuestModeModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
