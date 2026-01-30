import { fn } from "storybook/test";
import { SubtaskList } from "./SubtaskList";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { SubtaskListItem } from "../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const mockedSubtasks = [
  { id: 2, text: "Define user persona and primary CTA", isDone: false },
  { id: 3, text: "Create low-fidelity wireframes", isDone: false },
  { id: 4, text: "Select color palette and typography", isDone: true },
  { id: 5, text: "Design high-fidelity UI mockup", isDone: true },
  { id: 6, text: "Prototype mobile-responsive layout", isDone: true },
];

const meta = {
  title: "Components/subtasks/SubtaskList",
  component: SubtaskList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedSubtasks.map((subtask) => (
      <SubtaskListItem
        {...subtask}
        subtaskText={subtask.text}
        actionMenuTrigger={
          <SubtaskActionMenuTrigger
            guestMode={true}
            subtaskId={subtask.id}
            isDone={subtask.isDone}
            subtaskText={subtask.text}
            deleteAction={fn()}
            toggleSubtaskAction={fn()}
            editSubtaskForm={
              <EditSubtaskForm taskId={subtask.id} formAction={fn()} />
            }
            mutate={fn()}
          />
        }
      />
    )),
  },
} satisfies Story;
