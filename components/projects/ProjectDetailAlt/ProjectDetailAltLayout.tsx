interface ProjectDetailAltLayoutProps {
  titleSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  customerSlot: React.ReactNode;
  categorySlot: React.ReactNode;
}

export function ProjectDetailAltLayout({
  titleSlot,
  descriptionSlot,
  creatorSlot,
  statusSlot,
  deadlineSlot,
  customerSlot,
  categorySlot,
}: ProjectDetailAltLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {titleSlot}
      {descriptionSlot}
      {statusSlot}
      {deadlineSlot}
      {customerSlot}
      {categorySlot}
      {creatorSlot}
    </div>
  );
}
