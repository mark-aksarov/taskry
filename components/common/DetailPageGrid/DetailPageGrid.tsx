interface DetailPageGridProps {
  detailSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
}

export function DetailPageGrid({
  detailSlot,
  commentsSlot,
}: DetailPageGridProps) {
  return <div className="flex w-full max-md:gap-4 md:gap-6">{detailSlot}</div>;
}
