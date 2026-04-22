type CalendarHeaderCellProps = {
  day: React.ReactNode;
};

export function CalendarHeaderCell({ day }: CalendarHeaderCellProps) {
  return (
    <th className="text-center">
      <div className="m-auto flex h-8 w-8 items-center justify-center text-sm font-bold text-black dark:text-white">
        {day}
      </div>
    </th>
  );
}
