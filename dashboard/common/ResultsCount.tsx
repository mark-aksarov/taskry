interface ResultsCountProps {
  children: string;
}

export function ResultsCount({ children }: ResultsCountProps) {
  return (
    <div className="text-xs font-bold text-black dark:text-white">
      {children}
    </div>
  );
}
