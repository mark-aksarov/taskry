import { ProfileLink } from "../ProfileLink";
import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/layout/ProfileLink",
  component: ProfileLink,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProfileLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    fullName: "User 1",
    imageUrl: "/man.jpg",
  },
} satisfies Story;

export const WithoutImage = {
  args: {
    fullName: "User 1",
  },
} satisfies Story;
