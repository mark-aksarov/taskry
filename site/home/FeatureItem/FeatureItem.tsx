import { Card } from "@/site/common/Card";

interface FeatureItemProps {
  children: React.ReactNode;
}

export function FeatureItem({ children }: FeatureItemProps) {
  return (
    <Card className="group flex flex-col items-start gap-6 transition-all hover:-translate-y-1 hover:shadow-lg">
      {children}
    </Card>
  );
}
