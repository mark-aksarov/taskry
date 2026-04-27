import { CtaSection } from "../CtaSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/home/FinalCtaSection",
  component: FinalCtaSection,
  decorators: [withThemedBackground],
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
        signOut={async () => ({ status: "success" })}
        hasSession={true}
      />
    ),
  },
} satisfies Story;
