import {
  UserDetailBottomSheet,
  UserDetailBottomSheetProps,
} from "./UserDetailBottomSheet";

import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetailSkeleton } from "../UserDetail/UserDetailSkeleton";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

const meta = {
  title: "components/users/UserDetailBottomSheet",
  component: UserDetailBottomSheet,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    state: {
      isOpen: true,
      setOpen: () => {},
      open: () => {},
      close: () => {},
      toggle: () => {},
    },
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  render: (args) => <UserDetailBottomSheetTemplate {...args} />,
} satisfies Meta<typeof UserDetailBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const UserDetailBottomSheetTemplate = ({
  ...props
}: UserDetailBottomSheetProps) => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button {...triggerProps} label="User Detail" />
      <UserDetailBottomSheet {...props} state={state} />
    </>
  );
};

export const Default = {} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          UserDetailContainer: () => (
            <PersonDetailPresentation
              personHeader={<PersonHeaderSkeleton />}
              userDetail={<UserDetailSkeleton />}
            />
          ),
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
