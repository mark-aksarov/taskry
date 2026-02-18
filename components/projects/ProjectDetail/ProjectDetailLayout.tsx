import { DetailRow } from "@/components/common/Detail";

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
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-6">
      {titleSlot}
      <div className="flex flex-col gap-4">
        <DetailRow className={rowStyles}>
          {creatorSlot}
          {deadlineSlot}
        </DetailRow>
        <DetailRow className={rowStyles}>{descriptionSlot}</DetailRow>
        <DetailRow className={rowStyles}>
          {statusSlot}
          {categorySlot}
        </DetailRow>
        <DetailRow className={rowStyles}>{customerSlot}</DetailRow>
      </div>
    </div>
  );
}
