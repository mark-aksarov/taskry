interface TaskDetailAltLayoutProps {
  descriptionSlot: React.ReactNode;
  assigneesSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  categoryNameSlot: React.ReactNode;
  projectTitleSlot: React.ReactNode;
  statusSlot: React.ReactNode;
}

export function TaskDetailAltLayout({
  descriptionSlot,
  assigneesSlot,
  deadlineSlot,
  creatorSlot,
  categoryNameSlot,
  projectTitleSlot,
  statusSlot,
}: TaskDetailAltLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {descriptionSlot}
      {assigneesSlot}
      {deadlineSlot}
      {statusSlot}
      {categoryNameSlot}
      {projectTitleSlot}
      {creatorSlot}
    </div>
  );
}
