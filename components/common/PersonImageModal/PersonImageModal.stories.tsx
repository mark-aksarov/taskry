import { useState } from "react";
import { PersonImageModal } from "../PersonImageModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Button } from "@/components/ui/Button";

const meta = {
  title: "components/common/PersonImageModal",
  component: PersonImageModal,
  decorators: [withThemedBackground],
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <Button onPress={() => setIsOpen(true)} label="Change image" />
        <PersonImageModal isOpen={isOpen} onOpenChange={setIsOpen} />
      </>
    );
  },
} satisfies Meta<typeof PersonImageModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
