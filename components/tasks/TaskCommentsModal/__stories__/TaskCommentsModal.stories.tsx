import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DialogTrigger } from "react-aria-components";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { withCommentFormProvider } from "@/components/comments/withCommentFormProvider";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "components/tasks/TaskCommentsModal",
  component: TaskCommentsModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Task comments" />
        <Story />
      </DialogTrigger>
    ),
    withDeleteCommentModalProvider,
    withCommentFormProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
    taskCommentsContainer: <MockedCommentsContainer />,
    sendCommentAction: () => ({ status: "success" }),
    updateCommentAction: () => ({ status: "success" }),
  },
} satisfies Story;
