import { Database } from "lucide-react";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardValue,
} from "../DashboardCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CardHeading } from "@/components/common/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { getStorageUsage } from "@/lib/queries/storage";

export const StorageLimitCard = async () => {
  const storage = await getStorageUsage();
  const remaining = storage.limit - storage.used;

  return (
    <DashboardCard
      className="w-full"
      heading={<CardHeading>Storage Limit</CardHeading>}
      icon={
        <DashboardCardIcon color="green">
          <Database size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>{remaining} MB</DashboardCardValue>}
      progress={
        <ProgressBar
          textClassName="text-sm font-normal"
          label={`${remaining} MB / ${storage.limit} MB`}
          value={(remaining / storage.limit) * 100}
        />
      }
    />
  );
};

export const StorageLimitCardSkeleton = () => {
  return (
    <DashboardCard
      className="w-full"
      heading={<CardHeading>Storage Limit</CardHeading>}
      icon={
        <DashboardCardIcon color="green">
          <Database size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<Skeleton className="w-[3rem]" size="3xl" />}
      stat={<Skeleton className="w-full" size="base" />}
    />
  );
};
