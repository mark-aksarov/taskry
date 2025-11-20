import { DetailRow } from "@/components/common/Detail";

interface TaskDetailFullLayoutProps {
  descriptionSlot: React.ReactNode;
  subtasksSlot: React.ReactNode;
  attachmentsSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
}

export function TaskDetailFullLayout({
  descriptionSlot,
  subtasksSlot,
  attachmentsSlot,
  commentsSlot,
}: TaskDetailFullLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      <DetailRow>{descriptionSlot}</DetailRow>
      <DetailRow>{subtasksSlot}</DetailRow>
      <DetailRow>{attachmentsSlot}</DetailRow>
      <DetailRow>{commentsSlot}</DetailRow>
    </div>
  );
}
