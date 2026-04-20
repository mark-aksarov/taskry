interface TaskDetailLayoutProps {
  titleSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  assigneesSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  categoryNameSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  projectTitleSlot: React.ReactNode;
  subtasksSlot: React.ReactNode;
}

export function TaskDetailLayout({
  titleSlot,
  assigneesSlot,
  deadlineSlot,
  descriptionSlot,
  creatorSlot,
  categoryNameSlot,
  statusSlot,
  projectTitleSlot,
  subtasksSlot,
}: TaskDetailLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {titleSlot}
      <div className="flex flex-col gap-4">
        {assigneesSlot}
        {deadlineSlot}
        {descriptionSlot}
        {statusSlot}
        {categoryNameSlot}
        {projectTitleSlot}
        {creatorSlot}
        {subtasksSlot}
      </div>
    </div>
  );
}
