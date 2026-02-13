import {
  UserDetailBottomSheet,
  UserDetailBottomSheetProps,
} from "../UserDetailBottomSheet";

import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail } from "../../UserDetail/UserDetail";
import { UserDetailStory } from "../../UserDetail/__stories__";
import { OverlayTriggerStateContext } from "react-aria-components";
import { UserDetailSkeleton } from "../../UserDetail/UserDetailSkeleton";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

const meta = {
  title: "components/users/UserDetailBottomSheet",
  component: UserDetailBottomSheet,
  decorators: [withThemedBackground],
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
    <OverlayTriggerStateContext.Provider value={state}>
      <Button {...triggerProps} label="User Detail" />
      <UserDetailBottomSheet {...props} />
    </OverlayTriggerStateContext.Provider>
  );
};

export const Default = {
  args: {
    userId: "user-1",
    userDetailContainer: <UserDetail {...UserDetailStory.args} />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    userId: "user-1",
    userDetailContainer: (
      <PersonDetailPresentation
        personHeader={<DetailHeaderSkeleton />}
        userDetail={<UserDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
