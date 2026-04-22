import { Card } from "../common/Card";

interface CtaCardProps {
  children: React.ReactNode;
}

export function CtaCard({ children }: CtaCardProps) {
  return (
    <Card className="flex flex-col gap-10 self-center max-md:p-6 md:p-16">
      {children}
    </Card>
  );
}
