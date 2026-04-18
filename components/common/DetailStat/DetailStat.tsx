import { Skeleton } from "@/components/ui/Skeleton";

interface DetailStatProps {
  value: React.ReactNode;
  text: React.ReactNode;
}

export function DetailStat({ value, text }: DetailStatProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-gray-50 p-4 dark:bg-gray-700/30">
      {value}
      {text}
    </div>
  );
}

export function DetailStatSkeleton() {
  return (
    <DetailStat
      value={<Skeleton size="base" className="w-[5rem]" />}
      text={<Skeleton size="sm" className="w-[7rem]" />}
    />
  );
}
