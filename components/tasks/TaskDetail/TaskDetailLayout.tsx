import { DetailRow } from "@/components/common/Detail";

interface TaskDetailLayoutProps {
  titleSlot: React.ReactNode;
  statusMenuTriggerSlot: React.ReactNode;
  openTaskSlot: React.ReactNode;
  descriptionSlot: React.ReactNode;
  assigneesSlot: React.ReactNode;
  deadlineSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  categoryNameSlot: React.ReactNode;
  projectTitleSlot: React.ReactNode;
  subtasksSlot: React.ReactNode;
  attachmentsSlot: React.ReactNode;
}

export function TaskDetailLayout({
  titleSlot,
  statusMenuTriggerSlot,
  openTaskSlot,
  assigneesSlot,
  deadlineSlot,
  descriptionSlot,
  creatorSlot,
  categoryNameSlot,
  projectTitleSlot,
  subtasksSlot,
  attachmentsSlot,
}: TaskDetailLayoutProps) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {titleSlot}

        <div className="flex gap-4">
          {statusMenuTriggerSlot}
          {openTaskSlot}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <DetailRow className={rowStyles}>
          {assigneesSlot}
          {deadlineSlot}
        </DetailRow>
        <DetailRow className={rowStyles}>{descriptionSlot}</DetailRow>
        <DetailRow className={rowStyles}>
          {creatorSlot}
          {categoryNameSlot}
        </DetailRow>
        <DetailRow>{projectTitleSlot}</DetailRow>
        <DetailRow>{subtasksSlot}</DetailRow>
        <DetailRow>{attachmentsSlot}</DetailRow>
      </div>
    </div>
  );
}
