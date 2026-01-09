import { fn } from "storybook/test";
import { UserGridItem } from "./UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";

const meta = {
  title: "Components/users/UserGridItem",
  component: UserGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-full md:w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  render: (args) => <UserGridItem {...args} menuTrigger={renderMenu(args)} />,
} satisfies Meta<typeof UserGridItem>;

export default meta;
type Story = StoryObj<typeof UserGridItem>;

const renderMenu = (args: any) => (
  <UserItemActionMenuTrigger
    userId={args.id}
    userFullName={args.fullName}
    deleteAction={fn()}
  />
);

export const Default = {
  args: {
    id: "user1",
    fullName: "Liam Anderson",
    email: "liam.anderson@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990001001",
    publicLink: "https://example.com/liam",
    position: {
      name: "Developer",
    },
  },
} satisfies Story;

export const WithoutImagePositionPhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    position: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;
