import { twMerge } from "tailwind-merge";
import { Card } from "../Card";

interface DetailCardProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailCard({ className, children }: DetailCardProps) {
  return <Card className={twMerge("flex p-0", className)}>{children}</Card>;
}
