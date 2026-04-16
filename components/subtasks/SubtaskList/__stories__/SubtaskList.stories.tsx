import React from "react";
import { SubtaskList } from "../SubtaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { SubtaskListItem, SubtaskListItemVariant } from "../../SubtaskListItem";
import { MockedDeleteSubtaskProvider } from "../../DeleteSubtaskProvider/__stories__";
import { MockedUpdateSubtaskProvider } from "../../UpdateSubtaskProvider/__stories__";
import { MockedToggleSubtaskProvider } from "../../ToggleSubtaskProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const mockedSubtasks = [
  { id: 1, text: "Subtask placeholder text 1 text", isDone: false },
  { id: 2, text: "Subtask placeholder text 2 text", isDone: false },
  { id: 3, text: "Subtask placeholder text 3 text", isDone: true },
  { id: 4, text: "Subtask placeholder text 4 text", isDone: true },
  { id: 5, text: "Subtask placeholder text 5 text", isDone: true },
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

const SubtaskListTemplate = ({
  variant,
}: {
  variant: SubtaskListItemVariant;
}) => {
  return (
    <SubtaskList>
      {mockedSubtasks.map((subtask) => (
        <ModalManagerProvider key={subtask.id}>
          <MockedDeleteSubtaskProvider>
            <MockedUpdateSubtaskProvider>
              <MockedToggleSubtaskProvider>
                <SubtaskListItem {...subtask} variant={variant} />
              </MockedToggleSubtaskProvider>
            </MockedUpdateSubtaskProvider>
          </MockedDeleteSubtaskProvider>
        </ModalManagerProvider>
      ))}
    </SubtaskList>
  );
};

export const Plain = {
  args: {
    children: <SubtaskListTemplate variant="plain" />,
  },
} satisfies Story;

export const Rich = {
  args: {
    children: <SubtaskListTemplate variant="rich" />,
  },
} satisfies Story;
