import { IntroSection } from "./IntroSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";

const meta = {
  title: "site/home/IntroSection",
  component: IntroSection,
  decorators: [
    withModalManagerProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof IntroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    signOut: async () => ({ status: "success" }),
  },
} satisfies Story;
