export interface SubtaskListProps {
  children: React.ReactNode;
}

const styles = "flex flex-col gap-3 w-full";

export function SubtaskList({ children }: SubtaskListProps) {
  return (
    <div data-test="subtask-list" className={styles}>
      {children}
    </div>
  );
}
