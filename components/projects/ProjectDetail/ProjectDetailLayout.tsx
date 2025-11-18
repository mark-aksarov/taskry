import { DetailRow } from "@/components/common/Detail";

interface TaskDetailLayoutProps {
  titleSlot: React.ReactNode;
  statusMenuTriggerSlot: React.ReactNode;
  openProjectSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  customerSlot: React.ReactNode;
  categorySlot: React.ReactNode;
  attachmentsSlot: React.ReactNode;
}

export function ProjectDetailLayout({
  titleSlot,
  statusMenuTriggerSlot,
  openProjectSlot,
  creatorSlot,
  deadlineSlot,
  descriptionSlot,
  customerSlot,
  categorySlot,
  attachmentsSlot,
}: TaskDetailLayoutProps) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {titleSlot}

        <div className="flex gap-3">
          {statusMenuTriggerSlot}
          {openProjectSlot}
        </div>
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
        <DetailRow>{attachmentsSlot}</DetailRow>
      </div>
    </div>
  );
}
