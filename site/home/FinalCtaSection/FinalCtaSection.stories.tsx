import { FinalCtaSection } from "./FinalCtaSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSessionProvider } from "@/common/SessionContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";

const meta = {
  title: "site/home/FinalCtaSection",
  component: FinalCtaSection,
  decorators: [
    withModalManagerProvider,
    withSessionProvider,
    withThemedBackground,
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FinalCtaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    signOut: async () => ({ status: "success" }),
  },
} satisfies Story;
