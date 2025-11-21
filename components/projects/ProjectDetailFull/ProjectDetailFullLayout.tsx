import { DetailRow } from "@/components/common/Detail";

interface TaskDetailFullLayoutProps {
  descriptionSlot: React.ReactNode;
  attachmentsSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
}

export function ProjectDetailFullLayout({
  descriptionSlot,
  attachmentsSlot,
  commentsSlot,
}: TaskDetailFullLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      <DetailRow>{descriptionSlot}</DetailRow>
      <DetailRow>{attachmentsSlot}</DetailRow>
      <DetailRow>{commentsSlot}</DetailRow>
    </div>
  );
}
