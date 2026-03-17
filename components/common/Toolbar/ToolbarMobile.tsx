interface ToolbarMobileProps {
  firstSlot?: React.ReactNode;
  secondSlot?: React.ReactNode;
}

export function ToolbarMobile({ firstSlot, secondSlot }: ToolbarMobileProps) {
  return (
    <div className="flex items-center justify-between gap-2 md:hidden">
      <div className="flex items-center gap-3">{firstSlot}</div>
      <div className="flex items-center gap-2">{secondSlot}</div>
    </div>
  );
}
