import { mockedUserDetail } from "@/mocks/users";
import type { Meta, StoryObj } from "@storybook/react";
import { UserGridItemMobile } from "../UserGridItemMobile";
import { MockedUserItemModals } from "../../UserItemModals/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUserItemProviders } from "../../UserItemProviders/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const meta = {
  title: "components/users/UserGridItemMobile",
  component: UserGridItemMobile,
  decorators: [
    (Story) => (
      <>
        <Story />
        <MockedUserItemModals />
      </>
    ),

    withUserItemProviders,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof UserGridItemMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedUserDetail,
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
