interface DetailStatValueProps {
  children: React.ReactNode;
}

export function DetailStatValue({ children }: DetailStatValueProps) {
  return (
    <div className="text-base font-bold text-(--text-primary)">{children}</div>
  );
}
