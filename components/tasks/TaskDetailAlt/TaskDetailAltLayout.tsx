interface TaskDetailAltLayoutProps {
  titleSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  assigneesSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  categoryNameSlot: React.ReactNode;
  projectTitleSlot: React.ReactNode;
  statusSlot: React.ReactNode;
}

export function TaskDetailAltLayout({
  titleSlot,
  descriptionSlot,
  assigneesSlot,
  deadlineSlot,
  creatorSlot,
  categoryNameSlot,
  projectTitleSlot,
  statusSlot,
}: TaskDetailAltLayoutProps) {
  return (
    <div data-test="task-detail-alt" className="flex flex-col gap-4">
      {titleSlot}
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
