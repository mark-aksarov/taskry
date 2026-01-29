import { DetailRow } from "@/components/common/Detail";

interface ProjectDetailAltLayoutProps {
  descriptionSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  customerSlot: React.ReactNode;
  categorySlot: React.ReactNode;
  attachmentsSlot: React.ReactNode;
}

export function ProjectDetailAltLayout({
  descriptionSlot,
  creatorSlot,
  statusSlot,
  deadlineSlot,
  customerSlot,
  categorySlot,
  attachmentsSlot,
}: ProjectDetailAltLayoutProps) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-4">
      <DetailRow className={rowStyles}>{descriptionSlot}</DetailRow>
      <DetailRow className={rowStyles}>
        {statusSlot}
        {deadlineSlot}
      </DetailRow>
      <DetailRow className={rowStyles}>
        {customerSlot}
        {categorySlot}
      </DetailRow>
      <DetailRow>{creatorSlot}</DetailRow>
      <DetailRow>{attachmentsSlot}</DetailRow>
    </div>
  );
}
