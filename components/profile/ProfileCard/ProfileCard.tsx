import { twMerge } from "tailwind-merge";
import { Card } from "@/components/common/Card";

interface ProfileCardProps {
  className?: string;
  children: React.ReactNode;
}

export function ProfileCard({ className, children }: ProfileCardProps) {
  return <Card className={twMerge("flex p-0", className)}>{children}</Card>;
}
