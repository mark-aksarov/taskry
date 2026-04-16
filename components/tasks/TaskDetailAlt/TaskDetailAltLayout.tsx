interface TaskDetailAltLayoutProps {
  titleSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  assigneesSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  categoryNameSlot: React.ReactNode;
  projectTitleSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  progressSlot: React.ReactNode;
  subtasksSlot: React.ReactNode;
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
  progressSlot,
  subtasksSlot,
}: TaskDetailAltLayoutProps) {
  return (
    <div
      data-test="task-detail-alt"
      className="flex flex-col max-md:gap-4 md:gap-6"
    >
      {titleSlot}
      {assigneesSlot}
      {deadlineSlot}
      {statusSlot}
      {categoryNameSlot}
      {projectTitleSlot}
      {creatorSlot}
      {descriptionSlot}
      {progressSlot}
      {subtasksSlot}
    </div>
  );
}
