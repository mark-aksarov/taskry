import { UserDetail } from "../../UserDetail";
import { UserGridItem } from "../UserGridItem";
import { mockedUserDetail } from "@/mocks/users";
import { EditUserForm } from "../../EditUserForm";
import type { Meta, StoryObj } from "@storybook/react";
import { UserDetailHeader } from "../../UserDetailHeader";
import { mockedPositionSummaries } from "@/mocks/positions";
import { withUserItemProviders } from "../../UserItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";

const meta = {
  title: "components/users/UserGridItem",
  component: UserGridItem,
  decorators: [
    withUserItemProviders,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
  render: (args) => <UserGridItem {...args} />,
} satisfies Meta<typeof UserGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedUserDetail,
    editUserFormContainer: (
      <EditUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        userPositionSelectItems={mockedPositionSummaries}
      />
    ),
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        userId={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
        canUpdateImage={true}
        createPresignedUrl={() => ({ status: "success" })}
        updateUserImageUrl={() => ({ status: "success" })}
      />
    ),
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
