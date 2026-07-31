import { DeadlineBadge } from "../DeadlineBadge";
import { BadgeSkeleton, ButtonSkeleton } from "@/ui/Skeleton";
import { DetailCardTitle } from "../DetailCard/DetailCardTitle";

interface CommonProps {
  title: string;
  statusSlot: React.ReactNode;
  deleteButtonSlot: React.ReactNode;
}

export function DetailCardAltHeader(props: CommonProps) {
  return (
    <DetailCardAltHeaderLayout deadlineSlot={<DeadlineBadge />} {...props} />
  );
}

export function DetailCardAltHeaderSkeleton({
  title,
}: Pick<CommonProps, "title">) {
  return (
    <DetailCardAltHeaderLayout
      title={title}
      statusSlot={<BadgeSkeleton />}
      deadlineSlot={<BadgeSkeleton />}
      deleteButtonSlot={<ButtonSkeleton className="w-8" />}
    />
  );
}

interface DetailCardAltHeaderLayoutProps extends CommonProps {
  deadlineSlot: React.ReactNode;
}

function DetailCardAltHeaderLayout({
  title,
  statusSlot,
  deadlineSlot,
  deleteButtonSlot,
}: DetailCardAltHeaderLayoutProps) {
  return (
    <div className="mb-6 flex items-center gap-4 max-md:hidden">
      <DetailCardTitle className="mr-auto">{title}</DetailCardTitle>
      {statusSlot}
      {deadlineSlot}
      {deleteButtonSlot}
    </div>
  );
}
