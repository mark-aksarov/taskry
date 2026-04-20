interface UserTaskListProps {
  children: React.ReactNode;
}

export function UserTaskList({ children }: UserTaskListProps) {
  return (
    <div
      data-test="user-task-list"
      className="flex flex-col max-md:gap-4 md:gap-0 md:px-6"
    >
      {children}
    </div>
  );
}
