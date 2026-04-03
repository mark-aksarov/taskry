import { type Decorator } from "@storybook/nextjs-vite";
import { CommentFormProvider } from "../../CommentFormContext";

export const withCommentFormProvider: Decorator = (Story) => {
  return (
    <CommentFormProvider entityId={0} entityKey="projectId" mutateUrl="">
      <Story />
    </CommentFormProvider>
  );
};
