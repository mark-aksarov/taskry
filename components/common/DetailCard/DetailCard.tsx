import { twMerge } from "tailwind-merge";
import { Card } from "../Card";

interface DetailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function DetailCard({ className, children, ...props }: DetailCardProps) {
  return (
    <Card
      className={twMerge(
        "flex flex-col self-center p-0 max-2xl:w-full 2xl:w-[1024px]",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
