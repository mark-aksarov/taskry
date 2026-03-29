import { SubtaskList } from "../SubtaskList";
import { SubtaskListItem } from "../../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListItemStory } from "../../SubtaskListItem/__stories__";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { MockedDeleteSubtaskProvider } from "../../DeleteSubtaskProvider/__stories__";
import { MockedUpdateSubtaskProvider } from "../../UpdateSubtaskProvider/__stories__";
import { MockedToggleSubtaskProvider } from "../../ToggleSubtaskProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const mockedSubtasks = [
  { id: 1, subtaskText: "Subtask 1 text", isDone: false },
  { id: 2, subtaskText: "Subtask 2 text", isDone: false },
  { id: 3, subtaskText: "Subtask 3 text", isDone: true },
  { id: 4, subtaskText: "Subtask 4 text", isDone: true },
  { id: 5, subtaskText: "Subtask 5 text", isDone: true },
];

const meta = {
  title: "components/subtasks/SubtaskList",
  component: SubtaskList,
  decorators: [withCurrentUserProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedSubtasks.map((subtask) => (
      <ModalManagerProvider>
        <MockedDeleteSubtaskProvider>
          <MockedUpdateSubtaskProvider>
            <MockedToggleSubtaskProvider>
              <SubtaskListItem {...SubtaskListItemStory.args} {...subtask} />
            </MockedToggleSubtaskProvider>
          </MockedUpdateSubtaskProvider>
        </MockedDeleteSubtaskProvider>
      </ModalManagerProvider>
    )),
  },
} satisfies Story;
