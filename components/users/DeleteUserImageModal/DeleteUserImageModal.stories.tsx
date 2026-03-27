import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteUserImageModal } from "./DeleteUserImageModal";
import { useDeleteUserImageModal } from "./DeleteUserImageModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withClearUserImageUrlProvider } from "../ClearUserImageUrlProvider/__stories__";
import { withDeleteUserImageModalProvider } from "./__stories__/withDeleteUserImageModalProvider";

const meta = {
  title: "components/users/DeleteUserImageModal",
  component: DeleteUserImageModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useDeleteUserImageModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Story />
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
        </>
      );
    },
    withClearUserImageUrlProvider,
    withDeleteUserImageModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof DeleteUserImageModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userFullName: "User 1",
  },
} satisfies Story;
