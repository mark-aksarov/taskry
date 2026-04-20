import { DeadlineBadge } from "../DeadlineBadge";
import { DetailCardTitle } from "../DetailCard/DetailCardTitle";
import { BadgeSkeleton, ButtonSkeleton } from "@/ui/Skeleton";

interface CommonProps {
  title: string;
  statusSlot: React.ReactNode;
  deleteButtonSlot: React.ReactNode;
}

interface DetailCardAltHeaderProps extends CommonProps {
  deadline: string;
}

export function DetailCardAltHeader({
  deadline,
  ...props
}: DetailCardAltHeaderProps) {
  return (
    <DetailCardAltHeaderLayout
      deadlineSlot={<DeadlineBadge deadline={deadline} />}
      {...props}
    />
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
