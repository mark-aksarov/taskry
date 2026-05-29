import { CtaSection } from "../CtaSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";

const meta = {
  title: "site/home/FinalCtaSection",
  component: FinalCtaSection,
  decorators: [withModalManagerProvider, withThemedBackground],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FinalCtaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ctaActionsContainer: (
      <CtaSection
        isGuest={false}
        isEmailVerified={true}
        signOut={async () => ({ status: "success" })}
        hasSession={true}
      />
    ),
  },
} satisfies Story;
