import {
  UserDetailBottomSheet,
  UserDetailBottomSheetProps,
} from "./UserDetailBottomSheet";

import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { UserDetail } from "../UserDetail/UserDetail";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { UserDetailSkeleton } from "../UserDetail/UserDetailSkeleton";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserDetailStory } from "../UserDetail/UserDetail.stories";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

const meta = {
  title: "components/users/UserDetailBottomSheet",
  component: UserDetailBottomSheet,
  tags: ["autodocs"],
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
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    userDetailContainer: <UserDetail {...UserDetailStory.args} />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    userDetailContainer: (
      <PersonDetailPresentation
        personHeader={<PersonHeaderSkeleton />}
        userDetail={<UserDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
