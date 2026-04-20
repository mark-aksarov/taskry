interface ProjectDetailLayoutProps {
  titleSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  customerSlot: React.ReactNode;
  categorySlot: React.ReactNode;
}

export function ProjectDetailLayout({
  titleSlot,
  statusSlot,
  creatorSlot,
  deadlineSlot,
  descriptionSlot,
  customerSlot,
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
        {customerSlot}
      </div>
    </div>
  );
}
