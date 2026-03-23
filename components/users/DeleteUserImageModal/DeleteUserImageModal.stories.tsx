import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteUserImageModal } from "./DeleteUserImageModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { useDeleteUserImageModal } from "./DeleteUserImageModalContext";
import { withDeleteUserImageModalProvider } from "./__stories__/withDeleteUserImageModalProvider";

const meta = {
  title: "components/users/DeleteUserImageModal",
  component: DeleteUserImageModal,
  decorators: [withDeleteUserImageModalProvider, withThemedBackground],
  render: (args) => {
    const { onOpenChange } = useDeleteUserImageModal();

    useEffect(() => onOpenChange(true), [onOpenChange]);

    return (
      <>
        <Button label="Open modal" onClick={() => onOpenChange(true)} />
        <DeleteUserImageModal {...args} />
      </>
    );
  },
} satisfies Meta<typeof DeleteUserImageModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userFullName: "User 1",
  },
} satisfies Story;
