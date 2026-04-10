import { SubtasksCard } from "../SubtasksCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskListStory } from "../SubtaskList/__stories__";
import { SubtaskList, SubtaskListSkeleton } from "../SubtaskList";
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
    subtasksContainer: <SubtaskList {...SubtaskListStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    subtasksContainer: <SubtaskListSkeleton />,
  },
} satisfies Story;
