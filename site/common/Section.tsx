interface SectionProps {
  children: React.ReactNode;
}

export function Section({ children }: SectionProps) {
  return <section className="py-20">{children}</section>;
}
