import error from "./error";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/GrobalErrorPage",
  component: error,
  parameters: { layout: "fullscreen" },
  decorators: [withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
  args: {
    reset: () => {},
  },
} satisfies Meta<typeof error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    error: new Error("Something went wrong"),
  },
} satisfies Story;
