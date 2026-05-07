interface DetailStatTextProps {
  children: React.ReactNode;
}

export function DetailStatText({ children }: DetailStatTextProps) {
  return <div className="text-sm text-(--text-secondary)">{children}</div>;
}
