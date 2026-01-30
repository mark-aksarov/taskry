import { fn } from "storybook/internal/test";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { SubtasksCheckbox } from "../SubtasksCheckbox";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtasksCheckboxGroup } from "./SubtasksCheckboxGroup";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/SubtasksCheckboxGroup",
  component: SubtasksCheckboxGroup,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtasksCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const subtasks = [
  { id: 1, text: "Wireframe the layout", isDone: true },
  { id: 2, text: "Create high-fidelity mockups", isDone: false },
  { id: 3, text: "Review with stakeholders", isDone: false },
];

export const Default = {
  args: {
    defaultValue: ["1"],
    children: (
      <>
        {subtasks.map((subtask) => (
          <SubtasksCheckbox
            key={subtask.id}
            value={subtask.id.toString()}
            actionMenuTrigger={
              <SubtaskActionMenuTrigger
                guestMode={true}
                subtaskId={subtask.id}
                subtaskText={subtask.text}
                deleteAction={fn()}
                editSubtaskForm={
                  <EditSubtaskForm taskId={subtask.id} formAction={fn()} />
                }
                mutate={fn()}
              />
            }
          >
            {subtask.text}
          </SubtasksCheckbox>
        ))}
      </>
    ),
  },
} satisfies Story;
