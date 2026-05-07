interface ResultsCountProps {
  children: string;
}

export function ResultsCount({ children }: ResultsCountProps) {
  return (
    <div className="text-xs font-bold text-(--text-primary)">{children}</div>
  );
}
