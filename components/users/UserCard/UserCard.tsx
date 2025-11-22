import { twMerge } from "tailwind-merge";
import { Card } from "@/components/common/Card";

interface UserCardProps {
  className?: string;
  children: React.ReactNode;
}

export function UserCard({ className, children }: UserCardProps) {
  return (
    <Card
      className={twMerge(
        "m-auto flex max-h-full min-h-[500px] p-0 max-2xl:w-full max-md:hidden 2xl:w-[1024px]",
        className,
      )}
    >
      {children}
    </Card>
  );
}
