interface ProjectDetailAltLayoutProps {
  descriptionSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  customerSlot: React.ReactNode;
  categorySlot: React.ReactNode;
}

export function ProjectDetailAltLayout({
  descriptionSlot,
  creatorSlot,
  statusSlot,
  deadlineSlot,
  customerSlot,
  categorySlot,
}: ProjectDetailAltLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {descriptionSlot}
      {statusSlot}
      {deadlineSlot}
      {customerSlot}
      {categorySlot}
      {creatorSlot}
    </div>
  );
}
