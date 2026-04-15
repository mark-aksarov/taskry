import { twMerge } from "tailwind-merge";
import { Card } from "@/components/common/Card";

interface DetailCardProps {
  className?: string;
  "data-test"?: string;
  children: React.ReactNode;
}

export function DetailCard({
  className,
  "data-test": dataTest,
  children,
}: DetailCardProps) {
  return (
    <Card
      data-test={dataTest}
      className={twMerge(
        "m-auto flex p-0 max-2xl:w-full max-md:hidden 2xl:w-[1024px]",
        className,
      )}
    >
      {children}
    </Card>
  );
}
