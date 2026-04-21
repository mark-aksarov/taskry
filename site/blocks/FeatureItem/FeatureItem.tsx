import { Card } from "@/site/common/Card";

interface FeatureItemProps {
  children: React.ReactNode;
}

export function FeatureItem({ children }: FeatureItemProps) {
  return <Card className="flex flex-col items-start gap-6">{children}</Card>;
}
