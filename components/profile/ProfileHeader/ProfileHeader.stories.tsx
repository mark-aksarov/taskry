import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileHeader } from "./ProfileHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/profile/ProfileHeader",
  component: ProfileHeader,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    user: {
      fullName: "John Doe",
      imageUrl: "/man.jpg",
      position: { name: "Developer" },
    },
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    user: {
      fullName: "John Doe",
    },
  },
} satisfies Story;
