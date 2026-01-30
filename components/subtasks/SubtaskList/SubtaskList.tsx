interface SubtaskListProps {
  children: React.ReactNode;
}

export function SubtaskList({ children }: SubtaskListProps) {
  return <div className="flex flex-col gap-3">{children}</div>;
}
