import { usePathname } from "next/navigation";
import { mocked } from "storybook/internal/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileNavigationMobile } from "./ProfileNavigationMobile";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/ProfileNavigationMobile",
  component: ProfileNavigationMobile,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProfileNavigationMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Story;
