import { EmptySection } from "./EmptySection";

interface PageEmptySectionProps {
  children: React.ReactNode;
}

export function PageEmptySection({ children }: PageEmptySectionProps) {
  return (
    <EmptySection className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {children}
    </EmptySection>
  );
}
