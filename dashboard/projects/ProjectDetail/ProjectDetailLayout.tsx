interface ProjectDetailLayoutProps {
  titleSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  clientSlot: React.ReactNode;
  categorySlot: React.ReactNode;
}

export function ProjectDetailLayout({
  titleSlot,
  statusSlot,
  creatorSlot,
  deadlineSlot,
  descriptionSlot,
  clientSlot,
  categorySlot,
}: ProjectDetailLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {titleSlot}
      <div className="flex flex-col gap-4">
        {creatorSlot}
        {deadlineSlot}
        {descriptionSlot}
        {statusSlot}
        {categorySlot}
        {clientSlot}
      </div>
    </div>
  );
}
