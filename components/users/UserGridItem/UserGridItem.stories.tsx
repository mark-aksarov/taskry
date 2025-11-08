import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridItem } from "./UserGridItem";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/users/UserGridItem",
  component: UserGridItem,
  tags: ["autodocs"],
  decorators: [withContainerWidth("250px"), withBackgroundVariant()],
} satisfies Meta<typeof UserGridItem>;

export default meta;
type Story = StoryObj<typeof UserGridItem>;

export const Default = {
  args: {
    user: {
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
  },
} satisfies Story;

export const WithoutImagePositionPhoneAndLink = {
  args: {
    user: {
      ...Default.args.user,
      imageUrl: null,
      position: null,
      phoneNumber: null,
      publicLink: null,
    },
  },
} satisfies Story;

export const Skeleton: Story = {
  args: {
    user: undefined,
  },
} satisfies Story;
