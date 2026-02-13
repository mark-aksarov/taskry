import { DetailRow } from "@/components/common/Detail";

interface ProjectDetailLayoutProps {
  titleSlot: React.ReactNode;
  actionsSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  customerSlot: React.ReactNode;
  categorySlot: React.ReactNode;
}

export function ProjectDetailLayout({
  titleSlot,
  actionsSlot,
  creatorSlot,
  deadlineSlot,
  descriptionSlot,
  customerSlot,
  categorySlot,
}: ProjectDetailLayoutProps) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {titleSlot}

        <div className="flex gap-3">{actionsSlot}</div>
      </div>
      <div className="flex flex-col gap-4">
        <DetailRow className={rowStyles}>
          {creatorSlot}
          {deadlineSlot}
        </DetailRow>
        <DetailRow className={rowStyles}>{descriptionSlot}</DetailRow>
        <DetailRow className={rowStyles}>
          {customerSlot}
          {categorySlot}
        </DetailRow>
      </div>
    </div>
  );
}
