import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DialogTrigger } from "react-aria-components";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { withCommentFormProvider } from "@/components/comments/withCommentFormProvider";

const meta = {
  title: "components/projects/ProjectCommentsModal",
  component: ProjectCommentsModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Project comments" />
        <Story />
      </DialogTrigger>
    ),
    withCommentFormProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: 1,
    projectCommentsContainer: <MockedCommentsContainer />,
    sendCommentAction: () => ({ status: "success" }),
    updateCommentAction: () => ({ status: "success" }),
  },
} satisfies Story;
