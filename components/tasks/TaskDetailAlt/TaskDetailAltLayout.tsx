import { DetailRow } from "@/components/common/Detail";

interface TaskDetailAltLayoutProps {
  descriptionSlot: React.ReactNode;
  assigneesSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  categoryNameSlot: React.ReactNode;
  projectTitleSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  subtasksSlot: React.ReactNode;
  attachmentsSlot: React.ReactNode;
}

export function TaskDetailAltLayout({
  descriptionSlot,
  assigneesSlot,
  deadlineSlot,
  creatorSlot,
  categoryNameSlot,
  projectTitleSlot,
  statusSlot,
  subtasksSlot,
  attachmentsSlot,
}: TaskDetailAltLayoutProps) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-4">
      <DetailRow className={rowStyles}>{descriptionSlot}</DetailRow>
      <DetailRow className={rowStyles}>
        {assigneesSlot}
        {deadlineSlot}
      </DetailRow>
      <DetailRow className={rowStyles}>
        {statusSlot}
        {categoryNameSlot}
      </DetailRow>
      <DetailRow className={rowStyles}>
        {projectTitleSlot}
        {creatorSlot}
      </DetailRow>
      <DetailRow>{subtasksSlot}</DetailRow>
      <DetailRow>{attachmentsSlot}</DetailRow>
    </div>
  );
}
