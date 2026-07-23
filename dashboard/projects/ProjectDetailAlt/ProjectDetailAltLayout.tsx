interface ProjectDetailAltLayoutProps {
  titleSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  clientSlot: React.ReactNode;
  categorySlot: React.ReactNode;
  progressSlot: React.ReactNode;
  tasksStatsSlot: React.ReactNode;
}

export function ProjectDetailAltLayout({
  titleSlot,
  descriptionSlot,
  creatorSlot,
  statusSlot,
  deadlineSlot,
  clientSlot,
  categorySlot,
  progressSlot,
  tasksStatsSlot,
}: ProjectDetailAltLayoutProps) {
  return (
    <div className="flex flex-col max-md:gap-4 md:gap-6">
      {titleSlot}
      {descriptionSlot}
      {statusSlot}
      {deadlineSlot}
      {clientSlot}
      {categorySlot}
      {creatorSlot}
      {progressSlot}
      {tasksStatsSlot}
    </div>
  );
}
