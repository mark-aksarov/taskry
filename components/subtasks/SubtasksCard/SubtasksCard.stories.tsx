import { SubtasksCard } from "../SubtasksCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskList, SubtaskListSkeleton } from "../SubtaskList";
import { SubtaskListPlainStory } from "../SubtaskList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const meta = {
  title: "components/subtasks/SubtasksCard",
  component: SubtasksCard,
  decorators: [withCurrentUserProvider, withThemedBackground],

  parameters: {
    modalId: "createSubtask",
  },
} satisfies Meta<typeof SubtasksCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    subtasksContainer: <SubtaskList {...SubtaskListPlainStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    subtasksContainer: <SubtaskListSkeleton />,
  },
} satisfies Story;
