import { mocked } from "storybook/test";
import { AppHeader } from "./AppHeader";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModal } from "@/components/search/SearchModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchModalStory } from "@/components/search/SearchModal/__stories__";

const meta = {
  title: "components/layout/AppHeader",
  component: AppHeader,
  decorators: [withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    heading: "Dashboard",
    searchModal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;
