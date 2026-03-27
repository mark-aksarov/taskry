import { useEffect } from "react";
import { UpdateUserForm } from "../UpdateUserForm";
import { UpdateUserModal } from "./UpdateUserModal";
import { Button } from "@/components/ui/Button";
import { mockedUserDetail } from "@/mocks/users";
import { useUpdateUser } from "../UpdateUserContext";
import { UpdateUserFormSkeleton } from "../UpdateUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserProvider } from "../UpdateUserContext/__stories__";

const meta = {
  title: "components/users/UpdateUserModal",
  component: UpdateUserModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateUser();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button label="Edit user" onClick={() => onModalOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdateUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UpdateUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editUserFormContainer: (
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
    editUserFormContainer: <UpdateUserFormSkeleton />,
  },
} satisfies Story;
