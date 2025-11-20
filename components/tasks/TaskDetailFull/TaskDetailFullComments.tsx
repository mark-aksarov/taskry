import { TaskDetailFullCommentInput } from "./TaskDetailFullCommentInput";

export function TaskDetailFullComments({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <TaskDetailFullCommentInput />
      {children}
    </div>
  );
}
