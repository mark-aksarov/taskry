import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileDetailPanelHeader } from "./ProfileDetailPanelHeader";
import { usersMock } from "@/lib/data/__mocks__/users";
import { mocked } from "storybook/test";
import { getUserById } from "@/lib/queries/user";

const meta = {
  title: "components/profile/ProfileDetailPanelHeader",
  component: ProfileDetailPanelHeader,
  tags: ["autodocs"],
  beforeEach: () => {
    mocked(getUserById).mockReturnValue(
      new Promise((res) => res(usersMock[0])),
    );
  },
} satisfies Meta<typeof ProfileDetailPanelHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;
