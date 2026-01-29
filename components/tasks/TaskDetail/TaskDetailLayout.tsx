import { DetailRow } from "@/components/common/Detail";

interface TaskDetailLayoutProps {
  titleSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  assigneesSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  categoryNameSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  projectTitleSlot: React.ReactNode;
  subtasksSlot: React.ReactNode;
  attachmentsSlot: React.ReactNode;
}

export function TaskDetailLayout({
  titleSlot,
  assigneesSlot,
  deadlineSlot,
  descriptionSlot,
  creatorSlot,
  categoryNameSlot,
  statusSlot,
  projectTitleSlot,
  subtasksSlot,
  attachmentsSlot,
}: TaskDetailLayoutProps) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-6">
      {titleSlot}
      <div className="flex flex-col gap-4">
        <DetailRow className={rowStyles}>
          {assigneesSlot}
          {deadlineSlot}
        </DetailRow>
        <DetailRow className={rowStyles}>{descriptionSlot}</DetailRow>
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
    </div>
  );
}
