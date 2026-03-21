import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteUserImageModal } from "../DeleteUserImageModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserImageProvider } from "../DeleteUserImageContext/__stories__";
import { useDeleteUserImage } from "../DeleteUserImageContext/DeleteUserImageContext";

const meta = {
  title: "components/users/DeleteUserImageModal",
  component: DeleteUserImageModal,
  decorators: [withDeleteUserImageProvider, withThemedBackground],
  render: (args) => {
    const { onModalOpenChange } = useDeleteUserImage();

    useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

    return (
      <>
        <Button
          label="Delete user image"
          onClick={() => onModalOpenChange(true)}
        />
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
