import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileInfo } from "./ProfileInfo";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "components/profile/ProfileInfo",
  component: ProfileInfo,
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof ProfileInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    user: {
      id: "user1",
      fullName: "John Doe",
      email: "user1@example.com",
      phoneNumber: "+380990000001",
      publicLink: "https://example.com/user1",
      position: {
        name: "Developer",
      },
      bio: "John is a senior developer with over 10 years of experience in full-stack development. He enjoys mentoring junior developers, exploring new technologies, and contributing to open-source projects. In his free time, he loves hiking, reading sci-fi novels, and experimenting with creative coding projects.",
      birthdate: new Date(1985, 4, 15),
      address: "123 Main St, San Francisco, CA, USA",
    },
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    user: {
      id: "user1",
      fullName: "John Doe",
      email: "user1@example.com",
    },
  },
} satisfies Story;
