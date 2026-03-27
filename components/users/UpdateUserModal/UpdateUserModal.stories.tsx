import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { mockedUserDetail } from "@/mocks/users";
import { UpdateUserForm } from "../UpdateUserForm";
import { UpdateUserModal } from "./UpdateUserModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserFormSkeleton } from "../UpdateUserForm";
import { mockedPositionSummaries } from "@/mocks/positions";
import { withUpdateUserModalProvider } from "./__stories__";
import { useUpdateUserModal } from "./UpdateUserModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserProvider } from "../UpdateUserProvider/__stories__";

const meta = {
  title: "components/users/UpdateUserModal",
  component: UpdateUserModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useUpdateUserModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdateUserProvider,
    withUpdateUserModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UpdateUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateUserFormContainer: (
      <UpdateUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    updateUserFormContainer: <UpdateUserFormSkeleton />,
  },
} satisfies Story;
