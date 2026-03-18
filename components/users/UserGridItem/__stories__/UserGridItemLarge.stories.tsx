import { UserDetail } from "../../UserDetail";
import { mockedUserDetail } from "@/mocks/users";
import { EditUserForm } from "../../EditUserForm";
import type { Meta, StoryObj } from "@storybook/react";
import { UserDetailHeader } from "../../UserDetailHeader";
import { UserGridItemLarge } from "../UserGridItemLarge";
import { mockedPositionSummaries } from "@/mocks/positions";
import { withUserItemProviders } from "../../UserItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserImageProvider } from "../../UpdateUserImageContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";

const meta = {
  title: "components/users/UserGridItemLarge",
  component: UserGridItemLarge,
  decorators: [
    withUpdateUserImageProvider,
    withUserItemProviders,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserGridItemLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedUserDetail,
    editUserFormContainer: (
      <EditUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
        canUpdateImage={false}
      />
    ),
    deleteUser: () => ({ status: "success" }),
    updateUser: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    fullName: "This is a user name with a very long text for layout testing",
    email: "longemailaddressfortestingpurposes@exampledomainfortestemail.com",
    phoneNumber: "+1000000000000000000000000000000000000000000000000000",
    publicLink:
      "https://example.com/this-is-a-very-long-url-for-layout-testing",
  },
};

export const WithoutImagePositionPhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    position: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
