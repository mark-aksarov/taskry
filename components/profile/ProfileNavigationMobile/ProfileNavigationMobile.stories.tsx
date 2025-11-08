import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileNavigationMobile } from "./ProfileNavigationMobile";
import { mocked } from "storybook/internal/test";
import { usePathname } from "next/navigation";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "components/profile/ProfileNavigationMobile",
  component: ProfileNavigationMobile,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/info");
  },
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof ProfileNavigationMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Story;
